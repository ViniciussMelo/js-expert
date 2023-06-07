# a partir da pasta raiz
# pegar qualquer arquivo que termine com .test.js
find . -name *.test.js

# ingnorar node_modules
# ** -> para ignorar também os arquivos
find . -name *.test.js -not -path '*node_modules**'

# pegar todos js
# npm i -g ipt
# ipt -> ter um painel iterativo para selecionar quais arquivos a gente quer
find . -name *.js -not -path '*node_modules**' | ipt

# adicionar use strict em todos os arquivos que a gente quiser
# -o -> para selecionar mais de um
# xargs -> executar um comando para cada item retornado do find
# sed -> ferramenta de substituição
# sed -i -> edição
# 1s -> primeira linha
# ^ -> primeira coluna
# substituir por content e após quebrar linha adicionando u /n implícito
CONTENT="'use stricit';"
find . -name *.js -not -path '*node_modules**' \
| ipt -o \
| xargs -I '{file}' sed -i "" -e '1s/^/\'$CONTENT'\
/g' {file}

# mudar tudo sem selecionar
# remover o ipt -o \
CONTENT="'use stricit';"
find . -name *.js -not -path '*node_modules**' \
| xargs -I '{file}' sed -i "" -e '1s/^/\'$CONTENT'\
/g' {file}