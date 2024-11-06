# Tokens Compiler

## Organização de pastas/arquivos css

- na tag html ter a classe: .medme 
    Tokens de base (arquivo base.json) 
    Isso será um arquivo css

==============================================================

- na tag html ter a classe: .medme-default
    Tokens nao mutaveis relacionados aos componentes (lista com tokens de todos os componentes)

========== Modificadores de cor ==========

- na tag html ter a classe: .medme-default.scheme-dark
    Tokens relacionados ao tema default no modo scheme dark
    Isso será um arquivo css

- na tag html ter a classe: .medme-default.scheme-light
    Tokens relacionados ao tema default no modo scheme light
    Isso será um arquivo css

========== Modificadores de size ==========

- na tag html ter a classe: .medme-default.breakpoint-md
    Tokens relacionados aos componentes que sao mutaveis atraves de um breakpoint especifico

- na tag html ter a classe: .medme-default.breakpoint-lg
    Tokens relacionados aos componentes que sao mutaveis atraves de um breakpoint especifico

==============================================================

- na tag html ter a classe: .medme-billy
    Tokens nao mutaveis relacionados aos componentes

========== Modificadores de cor ==========

- na tag html ter a classe: .medme-billy.scheme-dark
    Tokens relacionados ao tema billy no modo scheme dark
    Isso será um arquivo css

- na tag html ter a classe: .medme-billy.scheme-light
    Tokens relacionados ao tema billy no modo scheme light
    Isso será um arquivo css

========== Modificadores de size ==========

- na tag html ter a classe: .medme-billy.breakpoint-md
    Tokens relacionados aos componentes que sao mutaveis atraves de um breakpoint especifico

    - na tag html ter a classe: .medme-billy.breakpoint-lg
    Tokens relacionados aos componentes que sao mutaveis atraves de um breakpoint especifico

==============================================================

<html class="medme medme-default scheme-dark"></html> 
<html class="medme medme-default scheme-light"></html> 
<html class="medme medme-default breakpoint-lg"></html> 
<html class="medme medme-default breakpoint-md"></html> 

<html class="medme medme-billy scheme-dark"></html> 
<html class="medme medme-billy scheme-light"></html> 
<html class="medme medme-billy breakpoint-lg"></html> 
<html class="medme medme-billy breakpoint-md"></html> 