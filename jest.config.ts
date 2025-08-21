
import type {Config} from 'jest';

const config: Config = {
  
  // Interrompe os testes imediatamente após uma falha ser encontrada
  bail: true,

  // Garante que cada função simulada (mocks) criadas durante os testes sejam limpas automaticamente, garantindo execução do teste em um ambiente limpo
  clearMocks: true,

  // Motor usado para cobertura do código, a parte do código testada (v8 é bem eficiente)
  coverageProvider: "v8",

  // Configura o jest para todar testes em TS, cuidando da compilação Ts -> JS
   preset: "ts-jest",

   // Define o ambiente de teste
   testEnvironment: "node",

   // Matriz de padrões de arquivos que o Jest irá procurar (arquivos terminados em .test.ts)
testMatch: ["<rootDir>/src/**/*.test.ts"],

// Mapeia os caminhos dos módulos para facilitar a importação (converte, por exemplo, o "@/..." para "./..."). Resolve conflitos de caminho.
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  }
};

export default config;
