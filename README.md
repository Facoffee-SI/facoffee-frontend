# 🎥 Facoffee
 
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

- A definir.

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

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
