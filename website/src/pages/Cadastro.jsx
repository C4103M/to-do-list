import { ChevronsLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Input from "../components/Input";
import Label from "../components/Label";
import Button from "../components/Button";
import fetchCadastro from "../services/fetchCadastro";
import verificarRegistro from "../services/verificarRegistro";

function Cadastro() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let reg = verificarRegistro({
                name,
                email,
                password,
                confirmPassword,
            });
            console.log(name, email, password);
            if (reg.valido) {
                let form_data = new FormData();
                form_data.append("nome", name);
                form_data.append("email", email);
                form_data.append("senha", password);

                await fetchCadastro(form_data);
                alert("Usuário cadastrado com sucesso!");
                navigate("/");
            } else {
                throw new Error(reg.mensagem);
            }
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-lg relative">
                <button
                    onClick={() => navigate(-1)}
                    className="absolute flex items-center justify-center mt-1 text-black"
                >
                    <ChevronsLeftIcon />
                </button>
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Cadastro
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label>Usuário</Label>
                        <Input
                            type="text"
                            placeholder="Digite seu usuário"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            placeholder="Insira o seu email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label>Senha</Label>
                        <Input
                            type="password"
                            placeholder="Digite sua senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Input
                            type="password"
                            placeholder="Confirme sua senha"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="mt-3"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Button type="submit">Cadastrar</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Cadastro;
