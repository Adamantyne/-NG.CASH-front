import { Link } from "react-router-dom";

import { AuthForm } from "../../layout/MacroElements/Form";
import ErrLabel from "../../layout/MicroElements/ErrLabel";
import Button from "../../layout/MicroElements/Button";
import Input from "../../layout/MicroElements/Input";

export default function SignInForm(props) {
  const {submitData,signInData,setSignInData,errorMessage} = props;

  return (
    <AuthForm onSubmit={submitData}>
      <h1>NG.CASH</h1>
      <Input
        type="username"
        required
        minLength={3}
        placeholder="Nome de usuário"
        value={signInData.username}
        onChange={(e) =>
          setSignInData({ ...signInData, username: e.target.value })
        }
      />
      <ErrLabel
        color={
          errorMessage.includes("username")
            ? "var(--color-error)"
            : "var(--color-transparent)"
        }
        message="Nome de usuário não cadastrado"
      />
      <Input
        type="password"
        required
        minLength={8}
        placeholder="Senha"
        value={signInData.password}
        onChange={(e) =>
          setSignInData({ ...signInData, password: e.target.value })
        }
      />
      <ErrLabel
        color={
          errorMessage.includes("password")
            ? "var(--color-error)"
            : "var(--color-transparent)"
        }
        message="Senha incorreta"
      />
      <Button type="submit">Entrar</Button>
      <Link to={"/signUp"}>
        <p>Não tem uma conta ? Clique aqui para criar !!</p>
      </Link>
    </AuthForm>
  );
}
