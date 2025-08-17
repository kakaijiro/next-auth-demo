"use client";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import React, { useEffect,  useState } from "react";
import { activate2fa, disable2fa, get2faSecret } from "./actions";
import { toast } from "sonner";
import { QRCodeCanvas } from "qrcode.react";
import { desc } from "drizzle-orm";
import { CardDescription } from "@/components/ui/card";

type Props = {
  twoFactorActivated: boolean;
};

export default function TwoFactorAuthForm({ twoFactorActivated }: Props) {
  const [isActivated, setIsActivated] = useState(twoFactorActivated);
  const [step, setStep] = useState(1);
  const [code, setCode] = useState("");
  const [otp, setOtp] = useState("");
  

  useEffect(() => {
    if (step === 3) {
      setOtp("");
    }
  }, [step]);

  const handleEnableClick = async () => {
    const response = await get2faSecret();

    if (response.error) {
      toast.error("Error!", {
        description: response.message,
      });
      return;
    }

    setStep(2);
    setCode(response.twoFactorSecret as string);
  };

  const handleOTPSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await activate2fa(otp);

    // failed
    if (response?.error) {
      toast.error("Error", {
        description: response.message ?? "An error occurred",
      });
      return; // exit function here
    }

    // succeeded
    toast.success("Success", {
      description: "Two-Factor Authentication has been enabled",
    });

    setIsActivated(true);
  };

  const handleDisable2faClick = async () => {
    await disable2fa();

    toast.success("Success", {
      description: "Two-Factor Authentication has been disabled",
    })

    setIsActivated(false)
    setStep(1)
  };

  return (
    <>
      {isActivated && (
        <div className="flex flex-col gap-4 w-full">
          <Button variant="destructive" onClick={handleDisable2faClick}>
            Disable Two-Factor Authentication
          </Button>
        </div>
      )}
      {!isActivated && (
        <div className="flex flex-col gap-4 w-full">
          {step === 1 && (
            <Button onClick={handleEnableClick}>
              Enable 2Factor Authentication
            </Button>
          )}
          {step === 2 && (
            <div className="flex flex-col gap-4 w-full">
              <p className="text-xs">
                Scan the QR code below in the Google Authenticator app to
                activate Two-Factor Authentication.
              </p>
              <QRCodeCanvas value={code} className="my-2" />
              <Button variant="default" onClick={() => setStep(3)}>
                I have scanned the QR code
              </Button>
              <Button variant="outline" onClick={() => setStep(1)}>
                Cancel
              </Button>
            </div>
          )}
          {step === 3 && (
            <form
              onSubmit={handleOTPSubmit}
              className="flex flex-col justify-center items-center gap-4"
            >
              <p className="text-xs">
                Please enter the one-time passcode from the Google Authenticator
                app.
              </p>
              <InputOTP maxLength={6} value={otp} onChange={setOtp} >
                <InputOTPGroup>
                  <InputOTPSlot index={0}  />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <Button
                variant="default"
                type="submit"
                disabled={otp.length !== 6}
                className="w-full"
              >
                Submit
              </Button>
              <Button
                variant="outline"
                onClick={() => setStep(2)}
                className="w-full"
              >
                Cancel
              </Button>
            </form>
          )}
        </div>
      )}
    </>
  );
}
