# ☕ Facoffee
 
 ## 📋 Sobre
  Esse projeto foi desenvolvido na disciplina de Construção de Software.

  Consiste em um sistema de gerenciamento de assinatura para planos de uma cafeteria.

## 💾 Etapas

  - Prototipação das telas no Figma: 
    - [Protótipo Figma](https://www.figma.com/file/D7tzVcx1el1nfEbbNQk5iw/Facoffee?type=design&node-id=0%3A1&mode=design&t=3WhN1T16Sqwjbp5B-1)
  
  - Implementação das telas do Figma
    - Nessa parte do projeto, foram escolhidas as tecnologias que seriam utilizadas e implementado as telas seguindo a protipação proposta no Figma.

## 💻 Tecnologias utilizadas
- [**React + TypeScript + Vite**](https://react.dev/reference/react) para a criação do front-end.

- Atualmente, estamos utilizando dois plugins:

  - [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) usando [Babel](https://babeljs.io/) para Fast Refresh
  - [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) usando [SWC](https://swc.rs/) para Fast Refresh

## 📚 Funcionalidades

- [PDF dos requisitos de negócio](https://drive.google.com/file/d/1YJU86FUfpad_ISTTdoCKdDNRFaiKg0X8/view?usp=drive_link)

## 👨‍💻 Como instalar e rodar o projeto

  - Primeiramente clone o repositório
    
        git clone https://github.com/Facoffee-SI/facoffee-frontend

  - Instale o Node se ainda não tiver instalado (de preferência uma versão acima da 18).
  - Entre no repositório que foi clonado

        cd facoffee-frontend

  - Instale as dependências

        yarn
  
  - Rode o projeto

        yarn dev
    
      Assim o projeto já estará rodando pronto para o uso.

## 🌐 Acessando o projeto

  - Link para o Painel de Administrador:
    - http://localhost:5173/admin/login
    - Foi criado um usuário admin padrão com o Login:
      ```
      Email: adminuser@mailinator.com
      Senha: 123456789Ab!
      ```

  - Link para o Painel de Usuário:
    - http://localhost:5173/customer/login
  