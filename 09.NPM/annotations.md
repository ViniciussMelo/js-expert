# Major.Minor.Patch

## Restaurar os pacotes:
+ ```npm install``` : 
  - olha pra dentro do package.json;
  - não sabemos qual a versão que funcionou da última vez;
  - se for pra fixar versão, tem que usar esse primeiro pra alterar o lock;
  - olha sempre pro mais recente!!!
+ ```npm ci``` : 
  - olha pro package-lock;
  - instala as versões correspondentes dentro do package-lock;
  - tem que ter um package.lock se não dá erro falando que não existe;
  - não serve pra fixar versão pq ele vai pegar sempre a última do lock.

## Versões:

+ 1.2.3:
  - 1: versão major (breaking change / nova versão)
  - 2: versão minor (novas features)
  - 3: patch (correção de bug)

+ Quando aumenta o próximo, o anterior zera
  - Ex: 1.0.1 -> aumentar o minor
  - 1.1.0 -> o patch vai pra 0 (funciona como horário)

+ Aumentar o patch:
  - npm version patch

+ Aumentar o minor:
  - npm version minor

+ Aumentar o major:
  - npm version major

## Atualizar todos os pacotes npm:
+ ```npm update```
  - Ele não atualiza o major para não quebrar a aplicação!! Para isso, tem que instalar manualmente (npm install);
  - Olha sempre pro wanted (npm outdated).

## Símbolos:
+ ```^```: 
  - ^1.0.0: vai pegar todos os valores que tem 0 e colocar a maior versão, começando do minor
    - ```> 1.0.0 até < 2.0.0```

+ ```~```: 
  - ~1.1.0: vai buscar o maior dentro minor;
    - Ex: 1.1.9 -> pega o último patch dentro do minor específicado.

+ ```> <```:
  - >1.0.0 <2.0.1: pega o que está dentro do range;
    - Ex: 2.0.0 -> pega a maior dentro do range;
  - npm i vai pegar sempre o mais recente, por isso tem que usar o npm update
  pra respeitar o range e pegar o wanted.

## Utils: 
+ Remover pacote do package.json e package.lock:
  - ```npm rm @viniciusspmelo/fluentsql``` -> nome do pacote

+ Publicar pacote: 
  - npm publish --access=public;

+ Semantic version -> semver:
  - Veio para resolver o problema de dependency hell
  - npm version patch
  - npm version minor
  - npm version major
  - Major.Minor.Patch

+ Como ver quais pacotes tem versão nova:
  - ```npm outdated```

+ Instalar última versão:
  - ```npm i @viniciusspmelo/fluentsql@latest```

+ Instalar última versão minor de um major específico:
  - ```npm i @viniciusspmelo/fluentsql@1.x``` -> vai instalar o último minor do major 1

+ ```mv -f recorded/* .```
  - Serve para recortar o conteúdo de uma pasta e colar no diretório específicado (nesse caso remove de recorded e coloca na pasta que estamos).