# Atlas - Sistema de Registro de Ocorrências

Sistema web de cadastro de ocorrências criminais. O comunicante preenche seus dados, endereço e informações da ocorrência em um único formulário. Nome do comunicante é criptografado automaticamente via stored procedure MySQL.

**Stack:** Java 25, Spring Boot 4.0, MySQL 8.0, HTML/CSS/JS

## Como rodar

**1. Banco de dados**

Crie o banco e execute os scripts na ordem:

```sql
CREATE DATABASE atlas;
USE atlas;

-- Rode cada um na sequência:
scripts SQL/Script.sql
scripts SQL/Stored Procedure.sql
scripts SQL/Trigger.sql
scripts SQL/Populate_Data.sql
```

**2. Backend**

Entre no diretório `atlas/` e rode:

```bash
$env:JAVA_HOME = "C:\Program Files\Java\jdk-25"; .\mvnw.cmd spring-boot:run
```

Servidor sobe em `http://localhost:8080`

**3. Frontend**

Abra o arquivo `frontend/index.html` direto no navegador ou use Live Server do VS Code

## Funcionalidades

- Registro integrado (comunicante + endereço + ocorrência)
- CRUD de cidades, bairros e tipos de crime
- Bairros filtrados por cidade
- Dashboard com totais
- Criptografia MD5 automática no nome do comunicante

## Configuração

Arquivo `atlas/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/atlas
spring.datasource.username=root
spring.datasource.password=12345678
```

## 👥 Autores

- Paulo Chagas — Script SQL gerado pelo Mysql Workbench — (Autor principal)
- Igor Grilo — Documentação do projeto — ([github.com/ibgrilo](https://github.com/ibgrilo))
- Rayara Vitória — DER segundo o documento de requisitos — ([https://github.com/Rayara21](https://github.com/Rayara21))
- Maria Tereza — DER segundo o documento de requisitos — Colaborador externo (sem perfil GitHub)
