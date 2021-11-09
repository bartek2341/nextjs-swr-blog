import { useEffect } from "react";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import styled from "styled-components";
import { Form, Field } from "react-final-form";
import { toast } from "react-toastify";
import { Button } from "@/components/index";
import { useAuth } from "@/firebase/auth";
import { loginValidation } from "@/lib/index";
import Head from "next/head";

const LoginPage = () => {
  const { login, user } = useAuth();
  let { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/");
  }, [user]);

  const onSubmit = async (values) => {
    const { email, password } = values;
    try {
      await login(email, password);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <Head>
        <title>{t("secret:login")}</title>
        <meta name="description" content={t("secret:login")} />
      </Head>
      <PageWrapper>
        <FormWrapper>
          <h2>{t("secret:login")}</h2>
          <Form
            onSubmit={onSubmit}
            validate={(values) => loginValidation(values, t)}
            render={({ handleSubmit, submitting }) => (
              <form noValidate onSubmit={handleSubmit} id="login">
                <Field name="email">
                  {({ input, meta }) => (
                    <div>
                      <label htmlFor={"email"}>{t("secret:email")}</label>
                      <input
                        {...input}
                        id="email"
                        type="email"
                        placeholder={t("secret:email")}
                      />
                      {meta.error && meta.touched && (
                        <Error>
                          <p>{meta.error}</p>
                        </Error>
                      )}
                    </div>
                  )}
                </Field>
                <Field name="password">
                  {({ input, meta }) => (
                    <div>
                      <label htmlFor={"password"}>{t("secret:password")}</label>
                      <input
                        {...input}
                        id="password"
                        type="password"
                        placeholder={t("secret:password")}
                      />
                      {meta.error && meta.touched && (
                        <Error>
                          <p>{meta.error}</p>
                        </Error>
                      )}
                    </div>
                  )}
                </Field>
                <Button type="submit" disabled={submitting} form={"login"}>
                  {t("secret:login")}
                </Button>
              </form>
            )}
          />
        </FormWrapper>
      </PageWrapper>
    </>
  );
};

export default LoginPage;

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const FormWrapper = styled.div`
  width: 75%;
  max-width: 300px;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.gray.dark};
  border-radius: ${({ theme }) => theme.spacing.sm};
  h2 {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    text-align: center;
  }
  form {
    & > div {
      display: flex;
      flex-direction: column;
      margin-bottom: ${({ theme }) => theme.spacing.md};
      label {
        display: flex;
        margin-bottom: ${({ theme }) => theme.spacing.xs};
        font-weight: ${({ theme }) => theme.fontWeights.bold};
      }
      input {
        z-index: 1;
      }
    }
  }
`;

const Error = styled.div`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-bottom-right-radius: ${({ theme }) => theme.spacing.xs};
  border-bottom-left-radius: ${({ theme }) => theme.spacing.xs};
  position: relative;
  top: -2px;
  background-color: ${({ theme }) => theme.colors.gray.dark};
`;
