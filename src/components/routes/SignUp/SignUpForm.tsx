import { Link } from "react-router-dom";

import {AuthForm} from "../../layout/MacroElements/Form";
import ErrLabel from "../../layout/MicroElements/ErrLabel";
import Button from "../../layout/MicroElements/Button";
import Input from "../../layout/MicroElements/Input";


export default function SignUpForm(props) {
  const {submitData,signUpData,setSignUpData,errorMessage} = props;

  return (
    <AuthForm onSubmit={submitData}>
      <h1>NG.CASH</h1>
      <Input
        type="username"
        required
        minLength={3}
        placeholder="Nome de usuário"
        value={signUpData.username}
        onChange={(e) =>
          setSignUpData({ ...signUpData, username: e.target.value })
        }
      />
      <ErrLabel
        color={
          errorMessage.includes("username")
            ? "var(--color-error)"
            : "var(--color-transparent)"
        }
        message="Nome de usuário já cadastrado"
      />
      <Input
        type="password"
        required
        minLength={8}
        placeholder="Senha"
        value={signUpData.password}
        onChange={(e) =>
          setSignUpData({ ...signUpData, password: e.target.value })
        }
      />
      <ErrLabel
      color={
        errorMessage.includes("password ")
          ? "var(--color-error)"
          : "var(--color-transparent)"
      }
      message="Deve ter ao menos um número e uma letra maiúscula"
      />
      <Input
        type="password"
        required
        minLength={8}
        placeholder="Repita sua senha"
        value={signUpData.confirmPassword}
        onChange={(e) =>
          setSignUpData({ ...signUpData, confirmPassword: e.target.value })
        }
      />
      <ErrLabel
        color={
          errorMessage.includes("confirmPassword")
            ? "var(--color-error)"
            : "var(--color-transparent)"
        }
        message="Repita sua senha corretamente"
      />
      <Button type="submit">Criar</Button>
      <Link to={"/"}>
        <p>Já possui uma conta ? clicke aqui para logar !!</p>
      </Link>
    </AuthForm>
  );
}
