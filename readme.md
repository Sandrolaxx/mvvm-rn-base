# 🏗 Arquitetura MVVM

## 📖 Historia

O MVVM foi desenvolvido por Ken Cooper e Ted Peters da Microsoft para simplificar a programação de eventos de interfaces de usuário usando recursos do Windows Presentation Foundation (WPF) (Microsoft .NET Graphical System) e do Silverlight (Derivative Internet Application). O padrão arquitetônico foi anunciado pela primeira vez no blog John Gossman em 2005.

Ficou muito popular no ecossistema Android e é recomendado a utilização pela equipe de desenvolvedores do Google e do Android.

No projeto do repositório temos uma implementação com React Native.

---

## 📝 Definição

O MVVM é um padrão de arquitetura baseado em Model, View e View-Model. Criado com o intuito de separar a interface do usuário da lógica de negócios, utilizando data binding para realizar a vinculação de dados.

Na prática, a camada Model não se comunica com a View nem a View se comunica com a Model. A View conhece a ViewModel, estas que interagem pelo data binding, e a ViewModel conhece a Model, onde realiza a busca dos dados e interação com eles, execução de regra de negócio e etc. 

É por isso que a camada ViewModel tem uma função tão importante no fluxo. Afinal, ela disponibiliza à View uma lógica de apresentação e coordena as iterações da View com a Model, além de poder implementar a lógica de validação para garantir a consistência dos dados.

Abaixo temos uma imagem apresentando a interação entre os três principais elementos.

![Diagrama Arquitetura MVVM](https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn-images-1.medium.com%2Fmax%2F1600%2F1*HueU0FB3hsNJDROlczMdLQ.png&f=1&nofb=1&ipt=3da38bae394ebee099cb7f7ae07be27940a3105d4dd6ffef50e4c8f776bf9174&ipo=images)

Definindo seus três principais elementos: 

> **View**: É responsável por definir a estrutura, o layout e a aparência do que o usuário vê na tela. Aqui no exemplo do nosso repo é nossos `.tsx` com toda a estrutura visual e estilos. 

> **View Model**: as camadas ViewModel coordenam as operações entre a view e as camadas model, além disso, evocará operações sobre a camada Model quando for necessário. Aqui em nosso exemplo do repo são os custom hooks.

> **Model**: O modelo no MVVM é uma implementação do modelo de domínio da aplicação, que inclui um modelo de dados juntamente com a lógica de negócios e a lógica de validação mais complexa(dependente de dados). Exemplos de objetos de modelo incluem repositórios, objetos de negócios, objetos de transferência de dados (DTOs). No nosso exemplo temos a interface de modelo na pasta `model` e os `repositories` esse seria os elementos que compoem nosso model.

---

## Benefícios?

MVVM e toda a sua organização nos provem uma série de benefícios, que são eles: 

* Separa lógica de negócios da UI
* Curva de aprendizado simples 
* Importante para o desenvolvimento mobile
* Simplifica testes unitários 
* Facilidade na manutenção do código. 
* Pode ser usado em Swift, Java, Dart (com Flutter) e frameworks JS. 

---

## Isso não é MVC?

Ai você pode me dizer "Mas já temos MVC, parece mais do mesmo!", calma lá, abaixo temos uma imagem que exemplifica no detalhe a principal diferença entre eles, o MVC é baseado em retornar uma página que foi criada por um [Template Engine](https://www.treinaweb.com.br/blog/o-que-e-template-engine/) quando requisitado em uma rota, já o MVVM a interação com o usuário ocorre inteiramente na camada da View. 

Eles têm o mesmo intuito, separar lógica de interface, porém resolvem o problema de maneiras distintas e são mais indicados para resolver problemas específicos, como MVC para sistemas Web e o MVVM para desenvolvimento android nativo.

![MVC vs MVP vs MVVM](https://cms.fittechinova.com/fti-web/assets/m86xi1kzgb4c00wo)

