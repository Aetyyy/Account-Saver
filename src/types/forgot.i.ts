interface Email {
  message: string;
  status: number;
  email?: undefined;
}

type ForgotPasswordButtonProps = {
  isSubmitting: boolean;
};

export type { ForgotPasswordButtonProps, Email };
