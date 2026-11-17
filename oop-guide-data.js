'use strict';
(function(root){const locales={
  "en": {
    "title": "Understand OOP: four ideas, different jobs",
    "intro": "Start with the idea, connect it to the code, then step through the model. OOP groups state and behaviour, but each pillar solves a different design problem.",
    "meaning": "What it means",
    "why": "Why use it?",
    "example": "Connect it to this course",
    "mistake": "Common mistake",
    "question": "Check your understanding",
    "answer": "Show explanation",
    "foundations": "Before the four pillars",
    "foundationText": "A class describes a kind of object; an object is one instance with its own state. A constructor establishes that initial state. Methods describe operations. Two accounts created from the same class can hold different balances. Public operations form the interface; private details belong to the implementation.",
    "workshop": "C++ deeper workshop",
    "workshopNote": "These independent C++17 examples extend the course. Choose a concept, inspect its relationship diagram and follow the explanation. The main lab below still uses your selected programming language. Diagram arrows point from derived class to base class.",
    "choose": "Choose a C++ concept",
    "trace": "Follow the example",
    "further": "Further reading",
    "encapsulation": "Encapsulation",
    "abstraction": "Abstraction",
    "inheritance": "Inheritance",
    "polymorphism": "Polymorphism",
    "pillars": {
      "encapsulation": {
        "meaning": "Keep an object’s rules beside its data, and make every state-changing operation respect those rules.",
        "why": "A bank account can reject an invalid deposit in one place instead of trusting every caller to check it.",
        "example": "In the account lab, begin with 100. deposit(25) passes the amount > 0 check and produces 125. deposit(-10) is rejected in the private-access example. get_balance() observes the value without changing it.",
        "mistake": "Adding getters and setters for every field is not automatically good encapsulation. A setter that accepts any balance still allows invalid state.",
        "question": "Two accounts start at 100. You deposit 25 into the first. What should the second contain?",
        "answer": "100. Each account has independent state. Only the receiving object changes; sharing a class does not mean sharing every field."
      },
      "abstraction": {
        "meaning": "Offer a small, meaningful operation that callers can use without coordinating its internal steps.",
        "why": "A caller asks an engine to start; it should not need to know the order of preparation tasks. Implementation details can change behind a stable interface.",
        "example": "The engine lab calls start(), which delegates to _prepare() before reporting Started. Follow the nested calls, then return to the caller. In C, functions provide a comparable interface without classes.",
        "mistake": "Abstraction and encapsulation overlap but ask different questions: what operation do callers need, and who may change the state? An abstract class is one tool, not a requirement for abstraction.",
        "question": "If _prepare() gains another internal check, must every caller of start() change?",
        "answer": "Not if start() keeps its promised behaviour. The caller relies on the interface, while the implementation manages preparation."
      },
      "inheritance": {
        "meaning": "Define a specialized type using an existing base type. With public C++ inheritance, the derived object can be used through the accessible base interface.",
        "why": "Use inheritance when the specialized type genuinely fulfils the base contract. For a has-a relationship, store another object as a member instead.",
        "example": "The course’s Dog extends Animal and carries the name Milo. In C, the comparable example embeds one struct inside another: that is composition, not language-level inheritance.",
        "mistake": "Do not inherit merely to save typing. A derived type that breaks the base promise is difficult to use safely. Multiple inheritance also requires care about ambiguous names and repeated base subobjects.",
        "question": "A classroom contains a projector. Should Classroom inherit Projector?",
        "answer": "Usually no: the classroom has a projector, rather than being a projector. A member object models that relationship more clearly."
      },
      "polymorphism": {
        "meaning": "Use one operation with different implementations. Runtime polymorphism selects an override according to the actual object; overloading selects among signatures using compile-time types in C++.",
        "why": "A loop can ask several objects to speak without writing a separate branch for every animal type.",
        "example": "The course asks Dog and Cat to speak: one produces Woof, the other Meow. In C++ the important test is a call through a base reference or pointer with a virtual function. The workshop shows that route explicitly.",
        "mistake": "A same-named method is not enough for C++ runtime dispatch. Use virtual in the base and override in the derived class. A base class used for polymorphic deletion needs a virtual destructor.",
        "question": "A base reference refers to a derived object. Which implementation runs when you call a virtual method?",
        "answer": "The final override for the actual derived object. Overloading is different: parameter types choose a signature before runtime dispatch."
      }
    },
    "workshops": {
      "single": {
        "title": "Single inheritance",
        "explanation": "Sensor has one direct base, Device. Constructing Sensor(7) first initializes its Device part; id() reads 7 from that base, while read() is Sensor’s own operation and returns 42."
      },
      "multiple": {
        "title": "Multiple inheritance",
        "explanation": "FieldUnit has two direct bases with separate responsibilities. report() obtains 21 from Sensor and passes it to Logger. If both bases supplied the same member name, explicit qualification or a redesigned interface could be needed."
      },
      "multilevel": {
        "title": "Multilevel inheritance",
        "explanation": "Camera derives from Device, which derives from Entity. Its constructor passes 7 through the chain to initialize Entity. camera.id() uses that inherited interface; capture() supplies camera-specific behaviour."
      },
      "hierarchical": {
        "title": "Hierarchical inheritance",
        "explanation": "Camera and Speaker share a base type, not one shared Device object. camera has ID 2 and speaker has ID 3. Each instance contains its own base subobject and provides its own operation."
      },
      "diamond": {
        "title": "Hybrid / diamond and virtual base",
        "explanation": "The diamond combines a shared ancestor with two inheritance paths. Both Camera and Radio virtually inherit Unit, so one Rover contains one Unit subobject. Rover initializes it with 9; both conversion paths reach that same subobject, so the address comparison prints true. Without virtual inheritance, the paths would lead to distinct Unit subobjects."
      },
      "protected": {
        "title": "Public, protected and private",
        "explanation": "Meter keeps raw_ private and offers raw() to derived-class code as a protected operation. CalibratedMeter::read() adds 2 to 40 and returns 42. Outside callers can use read(), but cannot call raw() or access raw_. C++ also grants access to declared friends; protected access has additional object-type rules."
      },
      "overloading": {
        "title": "Overloading: compile-time choice",
        "explanation": "The argument 3 has type int, so the compiler selects show(int). The argument 3.5 has type double, so it selects show(double). Return type alone cannot distinguish overloads. This example needs neither inheritance nor virtual functions."
      },
      "overriding": {
        "title": "Overriding: runtime choice",
        "explanation": "Notifier is abstract because notify() is pure virtual. announce() accepts a base reference, preserving the actual Screen or Speaker object. The same target.notify() expression dispatches to different overrides. The virtual destructor also supports safe deletion through a base pointer; this example uses automatic objects and does not delete them."
      }
    }
  },
  "da": {
    "title": "Forstå OOP: fire idéer med forskellige opgaver",
    "intro": "Start med idéen, forbind den med koden, og gennemgå modellen. OOP samler tilstand og adfærd, men hver søjle løser et forskelligt designproblem.",
    "meaning": "Hvad betyder det?",
    "why": "Hvorfor bruge det?",
    "example": "Forbind det med kurset",
    "mistake": "Typisk fejl",
    "question": "Tjek din forståelse",
    "answer": "Vis forklaring",
    "foundations": "Før de fire søjler",
    "foundationText": "En klasse beskriver en slags objekt; et objekt er én instans med sin egen tilstand. En konstruktør opretter starttilstanden. Metoder beskriver handlinger. To konti fra samme klasse kan have forskellige saldi. Offentlige handlinger danner grænsefladen; private detaljer hører til implementeringen.",
    "workshop": "C++: gå et skridt dybere",
    "workshopNote": "Disse selvstændige C++17-eksempler udvider kurset. Vælg et begreb, undersøg diagrammet, og følg forklaringen. Hovedlaboratoriet nedenfor bruger stadig dit valgte programmeringssprog. Pilene går fra afledt klasse til basisklasse.",
    "choose": "Vælg et C++-begreb",
    "trace": "Følg eksemplet",
    "further": "Læs mere",
    "encapsulation": "Indkapsling",
    "abstraction": "Abstraktion",
    "inheritance": "Arv",
    "polymorphism": "Polymorfi",
    "pillars": {
      "encapsulation": {
        "meaning": "Hold et objekts regler sammen med dets data, og lad alle handlinger, der ændrer tilstanden, overholde reglerne.",
        "why": "En bankkonto kan afvise en ugyldig indbetaling ét sted i stedet for at stole på, at alle kaldere kontrollerer den.",
        "example": "Kontolaboratoriet starter med 100. deposit(25) opfylder amount > 0 og giver 125. deposit(-10) afvises i eksemplet med privat adgang. get_balance() læser værdien uden at ændre den.",
        "mistake": "Gettere og settere til alle felter giver ikke automatisk god indkapsling. En setter, der accepterer enhver saldo, tillader stadig ugyldig tilstand.",
        "question": "To konti starter med 100. Du indsætter 25 på den første. Hvad indeholder den anden?",
        "answer": "100. Hver konto har sin egen tilstand. Kun modtagerobjektet ændres; samme klasse betyder ikke, at alle felter deles."
      },
      "abstraction": {
        "meaning": "Tilbyd en lille, meningsfuld handling, som kalderen kan bruge uden at koordinere dens interne trin.",
        "why": "Kalderen beder en motor om at starte og bør ikke kende rækkefølgen af forberedelser. Detaljerne kan ændres bag en stabil grænseflade.",
        "example": "Motorlaboratoriet kalder start(), som bruger _prepare(), før Started vises. Følg de indlejrede kald tilbage til kalderen. C bruger funktioner som en tilsvarende grænseflade uden klasser.",
        "mistake": "Abstraktion og indkapsling overlapper, men spørger forskelligt: Hvilken handling behøver kalderen, og hvem må ændre tilstanden? En abstrakt klasse er ét værktøj, ikke et krav.",
        "question": "Hvis _prepare() får en ekstra intern kontrol, skal alle kald til start() så ændres?",
        "answer": "Ikke hvis start() bevarer sin lovede adfærd. Kalderen bruger grænsefladen; implementeringen styrer forberedelserne."
      },
      "inheritance": {
        "meaning": "Definér en specialiseret type ud fra en basistype. Ved offentlig arv i C++ kan det afledte objekt bruges gennem den tilgængelige basisgrænseflade.",
        "why": "Brug arv, når den specialiserede type faktisk opfylder basistypens kontrakt. Ved et har-en-forhold bør et andet objekt være et medlem.",
        "example": "Kursets Dog udvider Animal og har navnet Milo. I C indlejrer det tilsvarende eksempel en struct i en anden: det er komposition, ikke arv i sproget.",
        "mistake": "Arv ikke kun for at spare tastning. En afledt type, der bryder basisløftet, er svær at bruge sikkert. Multipel arv kræver omtanke om tvetydige navne og gentagne basisdelobjekter.",
        "question": "Et klasselokale indeholder en projektor. Bør Classroom arve fra Projector?",
        "answer": "Normalt nej: lokalet har en projektor, men er ikke en projektor. Et medlemsobjekt beskriver forholdet tydeligere."
      },
      "polymorphism": {
        "meaning": "Brug én handling med forskellige implementeringer. Dynamisk polymorfi vælger en overskrivning efter det faktiske objekt; overloading vælger mellem signaturer ud fra typer ved kompilering i C++.",
        "why": "En løkke kan bede flere objekter om at tale uden en særskilt gren for hver dyretype.",
        "example": "Kurset beder Dog og Cat om at tale: Woof og Meow. I C++ er det afgørende et kald gennem en basisreference eller -pointer til en virtuel funktion. Workshoppen viser dette direkte.",
        "mistake": "Samme metodenavn er ikke nok til dynamisk dispatch i C++. Brug virtual i basisklassen og override i den afledte. En basisklasse brugt til polymorf sletning skal have en virtuel destruktør.",
        "question": "En basisreference refererer til et afledt objekt. Hvilken implementering kaldes ved en virtuel metode?",
        "answer": "Den endelige overskrivning for det faktiske afledte objekt. Overloading er anderledes: parametertyper vælger en signatur før dynamisk dispatch."
      }
    },
    "workshops": {
      "single": {
        "title": "Enkelt arv",
        "explanation": "Sensor har én direkte base, Device. Sensor(7) initialiserer først sin Device-del; id() læser 7 fra basen, mens read() er Sensors egen handling og returnerer 42."
      },
      "multiple": {
        "title": "Multipel arv",
        "explanation": "FieldUnit har to direkte baser med adskilte ansvar. report() henter 21 fra Sensor og sender tallet til Logger. Hvis begge baser havde samme medlemsnavn, kunne eksplicit kvalificering eller en ny grænseflade være nødvendig."
      },
      "multilevel": {
        "title": "Arv i flere niveauer",
        "explanation": "Camera arver fra Device, som arver fra Entity. Konstruktøren sender 7 gennem kæden til Entity. camera.id() bruger den nedarvede grænseflade; capture() giver kameraets egen adfærd."
      },
      "hierarchical": {
        "title": "Hierarkisk arv",
        "explanation": "Camera og Speaker deler en basistype, ikke ét fælles Device-objekt. camera har ID 2 og speaker ID 3. Hver instans har sit eget basisdelobjekt og sin egen handling."
      },
      "diamond": {
        "title": "Hybrid / diamant og virtuel base",
        "explanation": "Diamanten kombinerer en fælles forfader med to arveveje. Camera og Radio arver begge virtuelt fra Unit, så én Rover har ét Unit-delobjekt. Rover initialiserer det med 9; begge konverteringsveje rammer samme delobjekt, og adressesammenligningen giver true. Uden virtuel arv ville vejene ende i forskellige Unit-delobjekter."
      },
      "protected": {
        "title": "Public, protected og private",
        "explanation": "Meter holder raw_ privat og tilbyder raw() som en beskyttet handling til afledt kode. CalibratedMeter::read() lægger 2 til 40 og returnerer 42. Udefra kan man bruge read(), men ikke raw() eller raw_. C++ giver også adgang til erklærede friends; protected har yderligere regler om objekttypen."
      },
      "overloading": {
        "title": "Overloading: valg ved kompilering",
        "explanation": "Argumentet 3 har typen int, så compileren vælger show(int). Argumentet 3.5 har typen double, så show(double) vælges. Returtypen alene kan ikke skelne overloads. Her behøves hverken arv eller virtuelle funktioner."
      },
      "overriding": {
        "title": "Overriding: valg under kørsel",
        "explanation": "Notifier er abstrakt, fordi notify() er rent virtuel. announce() modtager en basisreference, som bevarer det faktiske Screen- eller Speaker-objekt. Samme target.notify() vælger forskellige overskrivninger. Den virtuelle destruktør muliggør sikker sletning gennem en basispointer; her bruges automatiske objekter uden delete."
      }
    }
  },
  "es": {
    "title": "Comprende OOP: cuatro ideas con funciones distintas",
    "intro": "Empieza por la idea, relaciónala con el código y recorre el modelo. OOP reúne estado y comportamiento, pero cada pilar resuelve un problema de diseño diferente.",
    "meaning": "Qué significa",
    "why": "¿Por qué usarlo?",
    "example": "Relación con este curso",
    "mistake": "Error habitual",
    "question": "Comprueba lo aprendido",
    "answer": "Mostrar explicación",
    "foundations": "Antes de los cuatro pilares",
    "foundationText": "Una clase describe un tipo de objeto; un objeto es una instancia con estado propio. El constructor establece el estado inicial. Los métodos describen operaciones. Dos cuentas de la misma clase pueden tener saldos distintos. Las operaciones públicas forman la interfaz; los detalles privados pertenecen a la implementación.",
    "workshop": "Taller avanzado de C++",
    "workshopNote": "Estos ejemplos independientes de C++17 amplían el curso. Elige un concepto, observa su diagrama y sigue la explicación. El laboratorio principal conserva el lenguaje seleccionado. Las flechas van de la clase derivada a la clase base.",
    "choose": "Elige un concepto de C++",
    "trace": "Sigue el ejemplo",
    "further": "Lecturas adicionales",
    "encapsulation": "Encapsulación",
    "abstraction": "Abstracción",
    "inheritance": "Herencia",
    "polymorphism": "Polimorfismo",
    "pillars": {
      "encapsulation": {
        "meaning": "Mantén las reglas de un objeto junto a sus datos y haz que todas las operaciones que cambian su estado respeten esas reglas.",
        "why": "Una cuenta bancaria puede rechazar un depósito inválido en un único lugar, sin confiar en que cada llamador lo compruebe.",
        "example": "La cuenta empieza con 100. deposit(25) supera amount > 0 y produce 125. deposit(-10) se rechaza en el ejemplo privado. get_balance() consulta sin modificar.",
        "mistake": "Crear getters y setters para todo no garantiza encapsulación. Un setter que acepta cualquier saldo sigue permitiendo estados inválidos.",
        "question": "Dos cuentas empiezan con 100. Depositas 25 en la primera. ¿Qué contiene la segunda?",
        "answer": "100. Cada cuenta tiene estado independiente. Solo cambia el objeto receptor; compartir clase no significa compartir todos los campos."
      },
      "abstraction": {
        "meaning": "Ofrece una operación pequeña y significativa que pueda usarse sin coordinar sus pasos internos.",
        "why": "Quien llama pide arrancar el motor; no debería conocer el orden de preparación. La implementación puede cambiar tras una interfaz estable.",
        "example": "El laboratorio llama start(), que utiliza _prepare() antes de mostrar Started. Sigue las llamadas anidadas y el retorno al llamador. En C, funciones ofrecen una interfaz equivalente sin clases.",
        "mistake": "Abstracción y encapsulación se relacionan, pero preguntan cosas distintas: qué operación necesita el llamador y quién puede modificar el estado. Una clase abstracta es una herramienta, no un requisito.",
        "question": "Si _prepare() añade una comprobación interna, ¿deben cambiar todos los llamadores de start()?",
        "answer": "No, si start() mantiene el comportamiento prometido. El llamador depende de la interfaz y la implementación gestiona la preparación."
      },
      "inheritance": {
        "meaning": "Define un tipo especializado a partir de una base. Con herencia pública en C++, el objeto derivado puede usarse mediante la interfaz accesible de la base.",
        "why": "Usa herencia cuando el tipo especializado cumpla el contrato de la base. Para una relación tiene-un, guarda otro objeto como miembro.",
        "example": "Dog amplía Animal y lleva el nombre Milo. En C, el ejemplo equivalente incluye una estructura dentro de otra: es composición, no herencia del lenguaje.",
        "mistake": "No heredes solo para escribir menos. Romper el contrato de la base dificulta un uso seguro. La herencia múltiple exige cuidar nombres ambiguos y subobjetos base repetidos.",
        "question": "Un aula contiene un proyector. ¿Debe Classroom heredar de Projector?",
        "answer": "Normalmente no: el aula tiene un proyector, no es un proyector. Un objeto miembro expresa mejor la relación."
      },
      "polymorphism": {
        "meaning": "Usa una operación con distintas implementaciones. El polimorfismo dinámico elige una redefinición según el objeto real; la sobrecarga en C++ elige firmas con tipos conocidos al compilar.",
        "why": "Un bucle puede pedir a varios objetos que hablen sin crear una rama para cada animal.",
        "example": "Dog y Cat producen Woof y Meow. En C++, la prueba importante es llamar a una función virtual mediante una referencia o puntero de la base. El taller muestra esa ruta.",
        "mistake": "Un nombre igual no basta para despacho dinámico en C++. Usa virtual en la base y override en la derivada. La eliminación polimórfica exige un destructor virtual en la base.",
        "question": "Una referencia base apunta a un objeto derivado. ¿Qué implementación ejecuta una llamada virtual?",
        "answer": "La redefinición final del objeto derivado real. La sobrecarga es distinta: los tipos de parámetros eligen una firma antes del despacho dinámico."
      }
    },
    "workshops": {
      "single": {
        "title": "Herencia simple",
        "explanation": "Sensor tiene una base directa, Device. Sensor(7) inicializa primero su parte Device; id() lee 7 de ella, mientras read() pertenece a Sensor y devuelve 42."
      },
      "multiple": {
        "title": "Herencia múltiple",
        "explanation": "FieldUnit tiene dos bases directas con responsabilidades separadas. report() obtiene 21 de Sensor y lo pasa a Logger. Si ambas bases tuvieran un miembro con el mismo nombre, podría requerirse calificación explícita o rediseñar la interfaz."
      },
      "multilevel": {
        "title": "Herencia multinivel",
        "explanation": "Camera deriva de Device y Device de Entity. El constructor transmite 7 por la cadena para inicializar Entity. camera.id() usa la interfaz heredada y capture() añade comportamiento propio."
      },
      "hierarchical": {
        "title": "Herencia jerárquica",
        "explanation": "Camera y Speaker comparten un tipo base, no un único objeto Device. camera tiene ID 2 y speaker ID 3. Cada instancia contiene su propio subobjeto base y su operación."
      },
      "diamond": {
        "title": "Híbrida / diamante y base virtual",
        "explanation": "El diamante combina un ancestro con dos rutas. Camera y Radio heredan virtualmente de Unit, por lo que Rover contiene un único subobjeto Unit. Rover lo inicializa con 9; ambas conversiones llegan al mismo subobjeto y la comparación imprime true. Sin herencia virtual habría subobjetos Unit distintos."
      },
      "protected": {
        "title": "Public, protected y private",
        "explanation": "Meter mantiene raw_ privado y ofrece raw() como operación protegida a las derivadas. CalibratedMeter::read() suma 2 a 40 y devuelve 42. Desde fuera solo se usa read(), no raw() ni raw_. C++ también permite acceso a friends declarados; protected tiene reglas adicionales sobre el tipo del objeto."
      },
      "overloading": {
        "title": "Sobrecarga: elección al compilar",
        "explanation": "3 es int, por lo que el compilador elige show(int). 3.5 es double y elige show(double). El tipo de retorno por sí solo no distingue sobrecargas. No se necesitan herencia ni funciones virtuales."
      },
      "overriding": {
        "title": "Redefinición: elección al ejecutar",
        "explanation": "Notifier es abstracta porque notify() es virtual pura. announce() recibe una referencia base que conserva el objeto Screen o Speaker real. target.notify() elige distintas redefiniciones. El destructor virtual permite eliminación segura mediante un puntero base; aquí los objetos son automáticos y no se eliminan con delete."
      }
    }
  },
  "fr": {
    "title": "Comprendre la POO : quatre idées, quatre rôles",
    "intro": "Pars de l’idée, relie-la au code, puis parcours le modèle. La POO réunit état et comportement, mais chaque pilier répond à un problème de conception différent.",
    "meaning": "Ce que cela signifie",
    "why": "Pourquoi l’utiliser ?",
    "example": "Lien avec ce cours",
    "mistake": "Erreur fréquente",
    "question": "Vérifie ta compréhension",
    "answer": "Afficher l’explication",
    "foundations": "Avant les quatre piliers",
    "foundationText": "Une classe décrit un type d’objet ; un objet est une instance avec son propre état. Le constructeur établit l’état initial. Les méthodes décrivent les opérations. Deux comptes de la même classe peuvent avoir des soldes différents. Les opérations publiques forment l’interface ; les détails privés appartiennent à l’implémentation.",
    "workshop": "Atelier C++ approfondi",
    "workshopNote": "Ces exemples autonomes en C++17 prolongent le cours. Choisis un concept, examine le diagramme et suis l’explication. Le laboratoire principal conserve le langage sélectionné. Les flèches vont de la classe dérivée à la classe de base.",
    "choose": "Choisir un concept C++",
    "trace": "Suivre l’exemple",
    "further": "Pour aller plus loin",
    "encapsulation": "Encapsulation",
    "abstraction": "Abstraction",
    "inheritance": "Héritage",
    "polymorphism": "Polymorphisme",
    "pillars": {
      "encapsulation": {
        "meaning": "Garde les règles d’un objet près de ses données et impose-les à chaque opération qui modifie son état.",
        "why": "Un compte bancaire peut refuser un dépôt invalide à un seul endroit, sans demander à chaque appelant de le vérifier.",
        "example": "Le compte commence à 100. deposit(25) satisfait amount > 0 et donne 125. deposit(-10) est refusé dans l’exemple privé. get_balance() lit sans modifier.",
        "mistake": "Des accesseurs pour tous les champs ne garantissent pas une bonne encapsulation. Un setter acceptant tout solde permet encore un état invalide.",
        "question": "Deux comptes commencent à 100. Tu déposes 25 sur le premier. Que contient le second ?",
        "answer": "100. Chaque compte a son propre état. Seul l’objet receveur change ; partager une classe ne signifie pas partager tous les champs."
      },
      "abstraction": {
        "meaning": "Propose une opération simple et utile que l’appelant peut utiliser sans coordonner ses étapes internes.",
        "why": "L’appelant demande de démarrer le moteur, sans connaître l’ordre des préparatifs. L’implémentation peut évoluer derrière une interface stable.",
        "example": "Le laboratoire appelle start(), qui utilise _prepare() avant d’afficher Started. Suis les appels imbriqués puis le retour. En C, des fonctions offrent une interface comparable sans classes.",
        "mistake": "Abstraction et encapsulation se recoupent, mais posent des questions différentes : quelle opération est nécessaire et qui peut modifier l’état ? Une classe abstraite est un outil, pas une obligation.",
        "question": "Si _prepare() ajoute un contrôle interne, faut-il modifier tous les appels à start() ?",
        "answer": "Non, si start() conserve le comportement promis. L’appelant dépend de l’interface ; l’implémentation organise la préparation."
      },
      "inheritance": {
        "meaning": "Définis un type spécialisé à partir d’un type de base. Avec l’héritage public en C++, l’objet dérivé peut être utilisé via l’interface accessible de la base.",
        "why": "Utilise l’héritage si le type spécialisé respecte le contrat de la base. Pour une relation possède-un, stocke plutôt un objet membre.",
        "example": "Dog étend Animal et porte le nom Milo. En C, l’exemple imbrique une structure dans une autre : c’est de la composition, pas de l’héritage du langage.",
        "mistake": "N’hérite pas seulement pour écrire moins. Briser le contrat de la base rend l’utilisation risquée. L’héritage multiple exige de traiter les noms ambigus et les sous-objets de base répétés.",
        "question": "Une salle contient un projecteur. Classroom doit-elle hériter de Projector ?",
        "answer": "Généralement non : la salle possède un projecteur, elle n’en est pas un. Un objet membre exprime mieux cette relation."
      },
      "polymorphism": {
        "meaning": "Utilise une opération avec différentes implémentations. Le polymorphisme dynamique choisit la redéfinition selon l’objet réel ; la surcharge C++ choisit une signature avec les types connus à la compilation.",
        "why": "Une boucle peut demander à plusieurs objets de parler sans branche particulière pour chaque animal.",
        "example": "Dog et Cat produisent Woof et Meow. En C++, le point décisif est l’appel virtuel via une référence ou un pointeur de base. L’atelier montre ce chemin.",
        "mistake": "Un même nom ne suffit pas au dispatch dynamique C++. Utilise virtual dans la base et override dans la dérivée. La suppression polymorphique nécessite un destructeur virtuel dans la base.",
        "question": "Une référence de base désigne un objet dérivé. Quelle implémentation exécute un appel virtuel ?",
        "answer": "La redéfinition finale de l’objet dérivé réel. La surcharge diffère : les types des paramètres choisissent la signature avant le dispatch dynamique."
      }
    },
    "workshops": {
      "single": {
        "title": "Héritage simple",
        "explanation": "Sensor possède une base directe, Device. Sensor(7) initialise d’abord sa partie Device ; id() y lit 7, tandis que read() appartient à Sensor et renvoie 42."
      },
      "multiple": {
        "title": "Héritage multiple",
        "explanation": "FieldUnit possède deux bases aux responsabilités distinctes. report() obtient 21 de Sensor et le transmet à Logger. Si les bases proposaient le même nom de membre, une qualification explicite ou une nouvelle interface pourrait être nécessaire."
      },
      "multilevel": {
        "title": "Héritage multiniveau",
        "explanation": "Camera dérive de Device, qui dérive d’Entity. Le constructeur transmet 7 le long de la chaîne pour initialiser Entity. camera.id() utilise l’interface héritée ; capture() fournit le comportement propre à la caméra."
      },
      "hierarchical": {
        "title": "Héritage hiérarchique",
        "explanation": "Camera et Speaker partagent un type de base, pas un unique objet Device. camera a l’ID 2 et speaker l’ID 3. Chaque instance contient son propre sous-objet de base et son opération."
      },
      "diamond": {
        "title": "Hybride / diamant et base virtuelle",
        "explanation": "Le diamant associe un ancêtre commun à deux chemins. Camera et Radio héritent virtuellement d’Unit : Rover contient un seul sous-objet Unit, initialisé à 9 par Rover. Les conversions atteignent le même sous-objet, donc la comparaison affiche true. Sans héritage virtuel, les sous-objets Unit seraient distincts."
      },
      "protected": {
        "title": "Public, protected et private",
        "explanation": "Meter garde raw_ privé et propose raw() comme opération protégée aux dérivées. CalibratedMeter::read() ajoute 2 à 40 et renvoie 42. L’extérieur peut appeler read(), pas raw() ni raw_. C++ autorise aussi les friends déclarés ; protected impose des règles supplémentaires sur le type de l’objet."
      },
      "overloading": {
        "title": "Surcharge : choix à la compilation",
        "explanation": "3 est de type int : le compilateur choisit show(int). 3.5 est double : il choisit show(double). Le type de retour seul ne distingue pas les surcharges. Ni héritage ni fonctions virtuelles ne sont nécessaires."
      },
      "overriding": {
        "title": "Redéfinition : choix à l’exécution",
        "explanation": "Notifier est abstraite car notify() est virtuelle pure. announce() reçoit une référence de base qui préserve l’objet Screen ou Speaker réel. target.notify() choisit des redéfinitions différentes. Le destructeur virtuel permet la suppression sûre via un pointeur de base ; ici les objets sont automatiques, sans delete."
      }
    }
  },
  "de": {
    "title": "OOP verstehen: vier Ideen, verschiedene Aufgaben",
    "intro": "Beginne mit der Idee, verbinde sie mit dem Code und gehe das Modell durch. OOP verbindet Zustand und Verhalten, doch jede Säule löst ein anderes Entwurfsproblem.",
    "meaning": "Bedeutung",
    "why": "Warum verwenden?",
    "example": "Bezug zu diesem Kurs",
    "mistake": "Häufiger Fehler",
    "question": "Prüfe dein Verständnis",
    "answer": "Erklärung anzeigen",
    "foundations": "Vor den vier Säulen",
    "foundationText": "Eine Klasse beschreibt eine Art von Objekt; ein Objekt ist eine Instanz mit eigenem Zustand. Der Konstruktor legt den Anfangszustand fest. Methoden beschreiben Operationen. Zwei Konten derselben Klasse können verschiedene Guthaben haben. Öffentliche Operationen bilden die Schnittstelle; private Details gehören zur Implementierung.",
    "workshop": "C++-Vertiefungswerkstatt",
    "workshopNote": "Diese eigenständigen C++17-Beispiele erweitern den Kurs. Wähle ein Konzept, untersuche das Diagramm und folge der Erklärung. Das Hauptlabor behält deine Programmiersprache bei. Pfeile zeigen von der abgeleiteten zur Basisklasse.",
    "choose": "C++-Konzept wählen",
    "trace": "Beispiel nachvollziehen",
    "further": "Weiterlesen",
    "encapsulation": "Kapselung",
    "abstraction": "Abstraktion",
    "inheritance": "Vererbung",
    "polymorphism": "Polymorphie",
    "pillars": {
      "encapsulation": {
        "meaning": "Halte die Regeln eines Objekts bei seinen Daten und lasse jede Zustandsänderung diese Regeln einhalten.",
        "why": "Ein Bankkonto kann ungültige Einzahlungen zentral ablehnen, statt auf Prüfungen durch jeden Aufrufer zu vertrauen.",
        "example": "Das Konto beginnt mit 100. deposit(25) erfüllt amount > 0 und ergibt 125. deposit(-10) wird im Privat-Zugriff-Beispiel abgelehnt. get_balance() liest ohne Änderung.",
        "mistake": "Getter und Setter für jedes Feld garantieren keine Kapselung. Ein Setter, der jeden Kontostand annimmt, erlaubt weiterhin ungültige Zustände.",
        "question": "Zwei Konten beginnen mit 100. Du zahlst 25 auf das erste ein. Was enthält das zweite?",
        "answer": "100. Jedes Konto besitzt eigenen Zustand. Nur das Empfängerobjekt ändert sich; dieselbe Klasse bedeutet nicht gemeinsame Felder."
      },
      "abstraction": {
        "meaning": "Biete eine kleine, sinnvolle Operation an, die Aufrufer ohne Koordination interner Schritte nutzen können.",
        "why": "Der Aufrufer möchte den Motor starten und soll die Vorbereitungsschritte nicht kennen müssen. Details können sich hinter einer stabilen Schnittstelle ändern.",
        "example": "Das Labor ruft start() auf, das vor der Ausgabe Started an _prepare() delegiert. Verfolge die verschachtelten Aufrufe und die Rückkehr. C bietet vergleichbare Schnittstellen durch Funktionen ohne Klassen.",
        "mistake": "Abstraktion und Kapselung überschneiden sich, fragen aber verschieden: Welche Operation braucht der Aufrufer, und wer darf Zustand ändern? Eine abstrakte Klasse ist ein Werkzeug, keine Voraussetzung.",
        "question": "Müssen alle Aufrufer von start() angepasst werden, wenn _prepare() eine interne Prüfung ergänzt?",
        "answer": "Nicht, wenn start() sein zugesagtes Verhalten behält. Der Aufrufer nutzt die Schnittstelle; die Implementierung verwaltet die Vorbereitung."
      },
      "inheritance": {
        "meaning": "Definiere einen spezialisierten Typ aus einem Basistyp. Bei öffentlicher C++-Vererbung kann das abgeleitete Objekt über die zugängliche Basisschnittstelle verwendet werden.",
        "why": "Nutze Vererbung, wenn der spezialisierte Typ den Basisvertrag erfüllt. Für eine Hat-ein-Beziehung speicherst du besser ein anderes Objekt als Mitglied.",
        "example": "Dog erweitert Animal und trägt den Namen Milo. Das entsprechende C-Beispiel bettet eine Struktur in eine andere ein: Komposition, keine Vererbung des Sprachsystems.",
        "mistake": "Vererbe nicht nur, um Tipparbeit zu sparen. Ein gebrochener Basisvertrag erschwert sichere Nutzung. Mehrfachvererbung erfordert Sorgfalt bei mehrdeutigen Namen und wiederholten Basis-Unterobjekten.",
        "question": "Ein Klassenraum enthält einen Projektor. Sollte Classroom von Projector erben?",
        "answer": "Normalerweise nicht: Der Raum hat einen Projektor, ist aber keiner. Ein Mitgliedsobjekt beschreibt die Beziehung deutlicher."
      },
      "polymorphism": {
        "meaning": "Verwende eine Operation mit verschiedenen Implementierungen. Laufzeitpolymorphie wählt die Überschreibung nach dem tatsächlichen Objekt; C++-Überladung wählt Signaturen anhand der Typen zur Übersetzungszeit.",
        "why": "Eine Schleife kann mehrere Objekte sprechen lassen, ohne für jede Tierart einen eigenen Zweig zu schreiben.",
        "example": "Dog und Cat erzeugen Woof und Meow. Entscheidend in C++ ist der virtuelle Aufruf über eine Basisreferenz oder einen Basiszeiger. Die Werkstatt zeigt diesen Weg.",
        "mistake": "Ein gleicher Methodenname genügt nicht für dynamische Bindung. Nutze virtual in der Basis und override in der Ableitung. Polymorphes Löschen verlangt einen virtuellen Basisdestruktor.",
        "question": "Eine Basisreferenz verweist auf ein abgeleitetes Objekt. Welche Implementierung läuft beim virtuellen Aufruf?",
        "answer": "Die endgültige Überschreibung des tatsächlichen abgeleiteten Objekts. Überladung ist anders: Parametertypen wählen die Signatur vor der Laufzeitbindung."
      }
    },
    "workshops": {
      "single": {
        "title": "Einfachvererbung",
        "explanation": "Sensor hat eine direkte Basis, Device. Sensor(7) initialisiert zuerst seinen Device-Teil; id() liest dort 7, während Sensors eigene Operation read() den Wert 42 liefert."
      },
      "multiple": {
        "title": "Mehrfachvererbung",
        "explanation": "FieldUnit besitzt zwei direkte Basen mit getrennten Aufgaben. report() erhält 21 von Sensor und übergibt es Logger. Bei gleichnamigen Mitgliedern könnte eine ausdrückliche Qualifizierung oder eine andere Schnittstelle nötig sein."
      },
      "multilevel": {
        "title": "Mehrstufige Vererbung",
        "explanation": "Camera erbt von Device und Device von Entity. Der Konstruktor gibt 7 durch die Kette an Entity weiter. camera.id() nutzt die geerbte Schnittstelle; capture() liefert kameraspezifisches Verhalten."
      },
      "hierarchical": {
        "title": "Hierarchische Vererbung",
        "explanation": "Camera und Speaker teilen einen Basistyp, nicht ein einziges Device-Objekt. camera hat ID 2, speaker ID 3. Jede Instanz enthält ihr eigenes Basis-Unterobjekt und ihre eigene Operation."
      },
      "diamond": {
        "title": "Hybrid / Raute und virtuelle Basis",
        "explanation": "Die Raute verbindet einen Vorfahren mit zwei Vererbungswegen. Camera und Radio erben virtuell von Unit, daher enthält Rover nur ein Unit-Unterobjekt. Rover initialisiert es mit 9; beide Konvertierungen erreichen dasselbe Unterobjekt, weshalb der Adressvergleich true ausgibt. Ohne virtuelle Vererbung wären die Unit-Unterobjekte getrennt."
      },
      "protected": {
        "title": "Public, protected und private",
        "explanation": "Meter hält raw_ privat und bietet raw() geschützt für abgeleiteten Code an. CalibratedMeter::read() addiert 2 zu 40 und liefert 42. Außenstehende können read(), aber weder raw() noch raw_ nutzen. C++ erlaubt auch deklarierten friends Zugriff; protected hat zusätzliche Objekttypregeln."
      },
      "overloading": {
        "title": "Überladung: Wahl beim Übersetzen",
        "explanation": "3 ist int, daher wählt der Compiler show(int). 3.5 ist double und wählt show(double). Der Rückgabetyp allein unterscheidet keine Überladungen. Weder Vererbung noch virtuelle Funktionen sind nötig."
      },
      "overriding": {
        "title": "Überschreibung: Wahl zur Laufzeit",
        "explanation": "Notifier ist abstrakt, da notify() rein virtuell ist. announce() erhält eine Basisreferenz, die das tatsächliche Screen- oder Speaker-Objekt bewahrt. target.notify() wählt verschiedene Überschreibungen. Der virtuelle Destruktor erlaubt sicheres Löschen über Basiszeiger; hier werden automatische Objekte ohne delete verwendet."
      }
    }
  },
  "pt": {
    "title": "Compreender POO: quatro ideias, funções diferentes",
    "intro": "Comece pela ideia, relacione-a com o código e percorra o modelo. A POO reúne estado e comportamento, mas cada pilar resolve um problema de design diferente.",
    "meaning": "O que significa",
    "why": "Porquê utilizar?",
    "example": "Ligação a este curso",
    "mistake": "Erro frequente",
    "question": "Teste a compreensão",
    "answer": "Mostrar explicação",
    "foundations": "Antes dos quatro pilares",
    "foundationText": "Uma classe descreve um tipo de objeto; um objeto é uma instância com estado próprio. O construtor estabelece o estado inicial. Os métodos descrevem operações. Duas contas da mesma classe podem ter saldos diferentes. As operações públicas formam a interface; os detalhes privados pertencem à implementação.",
    "workshop": "Oficina aprofundada de C++",
    "workshopNote": "Estes exemplos independentes de C++17 ampliam o curso. Escolha um conceito, observe o diagrama e siga a explicação. O laboratório principal mantém a linguagem selecionada. As setas apontam da classe derivada para a base.",
    "choose": "Escolha um conceito de C++",
    "trace": "Siga o exemplo",
    "further": "Leitura adicional",
    "encapsulation": "Encapsulamento",
    "abstraction": "Abstração",
    "inheritance": "Herança",
    "polymorphism": "Polimorfismo",
    "pillars": {
      "encapsulation": {
        "meaning": "Mantenha as regras do objeto junto dos dados e faça todas as operações que alteram o estado respeitarem essas regras.",
        "why": "Uma conta pode rejeitar um depósito inválido num único local, sem confiar que cada chamador o verifique.",
        "example": "A conta começa com 100. deposit(25) passa amount > 0 e produz 125. deposit(-10) é rejeitado no exemplo privado. get_balance() lê sem alterar.",
        "mistake": "Criar getters e setters para tudo não garante encapsulamento. Um setter que aceita qualquer saldo ainda permite estados inválidos.",
        "question": "Duas contas começam com 100. Deposita 25 na primeira. Quanto contém a segunda?",
        "answer": "100. Cada conta tem estado independente. Só o objeto recetor muda; partilhar a classe não significa partilhar todos os campos."
      },
      "abstraction": {
        "meaning": "Ofereça uma operação simples e significativa que possa ser usada sem coordenar os passos internos.",
        "why": "O chamador pede para iniciar o motor e não deve conhecer a ordem da preparação. A implementação pode mudar atrás de uma interface estável.",
        "example": "O laboratório chama start(), que usa _prepare() antes de mostrar Started. Siga as chamadas aninhadas e o regresso. Em C, funções oferecem uma interface semelhante sem classes.",
        "mistake": "Abstração e encapsulamento sobrepõem-se, mas perguntam coisas diferentes: que operação é necessária e quem pode alterar o estado? Uma classe abstrata é uma ferramenta, não um requisito.",
        "question": "Se _prepare() ganhar uma verificação interna, todos os chamadores de start() têm de mudar?",
        "answer": "Não, se start() mantiver o comportamento prometido. O chamador depende da interface e a implementação gere a preparação."
      },
      "inheritance": {
        "meaning": "Defina um tipo especializado a partir de uma base. Com herança pública em C++, o objeto derivado pode ser usado pela interface acessível da base.",
        "why": "Use herança quando o tipo especializado cumprir o contrato da base. Para uma relação tem-um, guarde outro objeto como membro.",
        "example": "Dog amplia Animal e tem o nome Milo. Em C, o exemplo inclui uma estrutura noutra: é composição, não herança da linguagem.",
        "mistake": "Não herde apenas para escrever menos. Quebrar o contrato da base dificulta o uso seguro. Herança múltipla exige cuidado com nomes ambíguos e subobjetos base repetidos.",
        "question": "Uma sala contém um projetor. Classroom deve herdar de Projector?",
        "answer": "Normalmente não: a sala tem um projetor, não é um projetor. Um objeto membro descreve melhor a relação."
      },
      "polymorphism": {
        "meaning": "Use uma operação com implementações diferentes. O polimorfismo dinâmico escolhe a redefinição pelo objeto real; a sobrecarga em C++ escolhe assinaturas pelos tipos na compilação.",
        "why": "Um ciclo pode pedir a vários objetos que falem sem um ramo para cada animal.",
        "example": "Dog e Cat produzem Woof e Meow. Em C++, importa chamar a função virtual por referência ou ponteiro da base. A oficina mostra esse caminho.",
        "mistake": "O mesmo nome não basta para despacho dinâmico em C++. Use virtual na base e override na derivada. A eliminação polimórfica exige um destrutor virtual na base.",
        "question": "Uma referência base aponta para um objeto derivado. Que implementação executa a chamada virtual?",
        "answer": "A redefinição final do objeto derivado real. Sobrecarga é diferente: os tipos dos parâmetros escolhem a assinatura antes do despacho dinâmico."
      }
    },
    "workshops": {
      "single": {
        "title": "Herança simples",
        "explanation": "Sensor tem uma base direta, Device. Sensor(7) inicializa primeiro a parte Device; id() lê 7 dessa base, enquanto read() é uma operação de Sensor e devolve 42."
      },
      "multiple": {
        "title": "Herança múltipla",
        "explanation": "FieldUnit tem duas bases diretas com responsabilidades distintas. report() obtém 21 de Sensor e passa-o a Logger. Nomes de membros iguais nas duas bases poderiam exigir qualificação explícita ou outra interface."
      },
      "multilevel": {
        "title": "Herança multinível",
        "explanation": "Camera deriva de Device, que deriva de Entity. O construtor transmite 7 pela cadeia para inicializar Entity. camera.id() usa a interface herdada; capture() acrescenta comportamento próprio."
      },
      "hierarchical": {
        "title": "Herança hierárquica",
        "explanation": "Camera e Speaker partilham um tipo base, não um único objeto Device. camera tem ID 2 e speaker ID 3. Cada instância contém o seu próprio subobjeto base e a sua operação."
      },
      "diamond": {
        "title": "Híbrida / diamante e base virtual",
        "explanation": "O diamante combina um antepassado com dois caminhos. Camera e Radio herdam virtualmente de Unit, pelo que Rover contém um único subobjeto Unit. Rover inicializa-o com 9; as duas conversões chegam ao mesmo subobjeto e a comparação mostra true. Sem herança virtual, existiriam subobjetos Unit distintos."
      },
      "protected": {
        "title": "Public, protected e private",
        "explanation": "Meter mantém raw_ privado e oferece raw() como operação protegida às derivadas. CalibratedMeter::read() soma 2 a 40 e devolve 42. De fora, usa-se read(), mas não raw() nem raw_. C++ também dá acesso a friends declarados; protected tem regras adicionais sobre o tipo do objeto."
      },
      "overloading": {
        "title": "Sobrecarga: escolha na compilação",
        "explanation": "3 é int, por isso o compilador escolhe show(int). 3.5 é double e escolhe show(double). Só o tipo de retorno não distingue sobrecargas. Não são necessárias herança nem funções virtuais."
      },
      "overriding": {
        "title": "Redefinição: escolha na execução",
        "explanation": "Notifier é abstrata porque notify() é virtual pura. announce() recebe uma referência base que preserva o objeto Screen ou Speaker real. target.notify() escolhe redefinições diferentes. O destrutor virtual permite eliminação segura por ponteiro base; aqui os objetos são automáticos e não usam delete."
      }
    }
  },
  "ar": {
    "title": "افهم البرمجة الكائنية: أربع أفكار بأدوار مختلفة",
    "intro": "ابدأ بالفكرة واربطها بالكود ثم تتبع النموذج. تجمع البرمجة الكائنية الحالة والسلوك، لكن كل ركيزة تعالج مشكلة تصميم مختلفة.",
    "meaning": "المعنى",
    "why": "لماذا نستخدمها؟",
    "example": "صلتها بهذا المقرر",
    "mistake": "خطأ شائع",
    "question": "اختبر فهمك",
    "answer": "عرض الشرح",
    "foundations": "قبل الركائز الأربع",
    "foundationText": "تصف الفئة نوعًا من الكائنات؛ والكائن نسخة لها حالتها الخاصة. يحدد المنشئ الحالة الأولية، وتصف الطرق العمليات. قد يملك حسابان من الفئة نفسها رصيدين مختلفين. تشكل العمليات العامة الواجهة، وتنتمي التفاصيل الخاصة إلى التنفيذ.",
    "workshop": "ورشة C++ المتعمقة",
    "workshopNote": "توسع أمثلة C++17 المستقلة هذه المقرر. اختر مفهومًا وافحص مخطط العلاقات واتبع الشرح. يحتفظ المختبر الرئيسي بلغتك البرمجية المختارة. تتجه الأسهم من الفئة المشتقة إلى الأساسية.",
    "choose": "اختر مفهومًا في C++",
    "trace": "تتبع المثال",
    "further": "قراءة إضافية",
    "encapsulation": "التغليف",
    "abstraction": "التجريد",
    "inheritance": "الوراثة",
    "polymorphism": "تعدد الأشكال",
    "pillars": {
      "encapsulation": {
        "meaning": "ضع قواعد الكائن قرب بياناته، واجعل كل عملية تغير حالته تلتزم بهذه القواعد.",
        "why": "يمكن للحساب البنكي رفض الإيداع غير الصالح في موضع واحد بدل الاعتماد على كل مستدعٍ للتحقق منه.",
        "example": "يبدأ الحساب بـ100. ينجح deposit(25) في شرط amount > 0 فيصبح الرصيد 125. يُرفض deposit(-10) في مثال الوصول الخاص. تقرأ get_balance() دون تغيير.",
        "mistake": "إضافة قارئ وكاتب لكل حقل لا تضمن التغليف الجيد. الكاتب الذي يقبل أي رصيد ما زال يسمح بحالة غير صالحة.",
        "question": "يبدأ حسابان بـ100. تودع 25 في الأول. ماذا يحتوي الثاني؟",
        "answer": "100. لكل حساب حالة مستقلة. يتغير الكائن المستقبِل فقط؛ مشاركة الفئة لا تعني مشاركة جميع الحقول."
      },
      "abstraction": {
        "meaning": "قدم عملية صغيرة ذات معنى يمكن استخدامها دون تنسيق خطواتها الداخلية.",
        "why": "يطلب المستدعي تشغيل المحرك ولا يحتاج إلى معرفة ترتيب التحضير. يمكن تغيير التفاصيل خلف واجهة مستقرة.",
        "example": "يستدعي المختبر start() التي تستخدم _prepare() قبل عرض Started. تتبع الاستدعاءات المتداخلة ثم العودة. تقدم دوال C واجهة مشابهة دون فئات.",
        "mistake": "يتداخل التجريد والتغليف لكن سؤالهما مختلف: ما العملية المطلوبة، ومن يحق له تغيير الحالة؟ الفئة المجردة أداة وليست شرطًا للتجريد.",
        "question": "إذا أضيف تحقق داخلي إلى _prepare()، هل يجب تعديل كل مستدعي start()؟",
        "answer": "لا، ما دامت start() تحافظ على سلوكها الموعود. يعتمد المستدعي على الواجهة ويتولى التنفيذ التحضير."
      },
      "inheritance": {
        "meaning": "عرّف نوعًا متخصصًا اعتمادًا على نوع أساسي. مع الوراثة العامة في C++ يمكن استخدام الكائن المشتق عبر واجهة الأساس المتاحة.",
        "why": "استخدم الوراثة عندما يفي النوع المتخصص بعقد الأساس. ولعلاقة يحتوي-على، خزّن كائنًا آخر كعضو.",
        "example": "توسع Dog الفئة Animal وتحمل الاسم Milo. يضم مثال C بنية داخل أخرى: هذا تركيب وليس وراثة على مستوى اللغة.",
        "mistake": "لا تستخدم الوراثة لتقليل الكتابة فقط. مخالفة عقد الأساس تصعّب الاستخدام الآمن. تتطلب الوراثة المتعددة الانتباه للأسماء الملتبسة والأجزاء الأساسية المتكررة.",
        "question": "يحتوي فصل على جهاز عرض. هل ينبغي أن ترث Classroom من Projector؟",
        "answer": "عادةً لا: الفصل يحتوي جهاز عرض لكنه ليس جهاز عرض. يوضح العضو الكائني العلاقة بصورة أفضل."
      },
      "polymorphism": {
        "meaning": "استخدم عملية واحدة بتنفيذات مختلفة. يختار تعدد الأشكال وقت التشغيل التجاوز حسب الكائن الفعلي؛ ويختار التحميل الزائد في C++ التوقيع حسب الأنواع وقت الترجمة.",
        "why": "يمكن لحلقة أن تطلب من كائنات متعددة الكلام دون فرع خاص لكل نوع حيوان.",
        "example": "تنتج Dog وCat القيمتين Woof وMeow. الاختبار المهم في C++ هو استدعاء دالة افتراضية عبر مرجع أو مؤشر للأساس. تعرض الورشة ذلك بوضوح.",
        "mistake": "تشابه الاسم لا يكفي للربط الديناميكي في C++. استخدم virtual في الأساس وoverride في المشتق. يتطلب الحذف متعدد الأشكال مدمرًا افتراضيًا في الأساس.",
        "question": "يشير مرجع أساسي إلى كائن مشتق. أي تنفيذ يعمل عند استدعاء طريقة افتراضية؟",
        "answer": "التجاوز النهائي للكائن المشتق الفعلي. يختلف التحميل الزائد: تختار أنواع المعاملات توقيعًا قبل الربط وقت التشغيل."
      }
    },
    "workshops": {
      "single": {
        "title": "وراثة أحادية",
        "explanation": "لدى Sensor أساس مباشر واحد هو Device. تهيئ Sensor(7) جزء Device أولًا؛ تقرأ id() القيمة 7 منه، بينما read() عملية خاصة بـSensor تعيد 42."
      },
      "multiple": {
        "title": "وراثة متعددة",
        "explanation": "لدى FieldUnit أساسان مباشران بمسؤوليتين مختلفتين. تحصل report() على 21 من Sensor وتمرره إلى Logger. إذا قدم الأساسان اسم العضو نفسه فقد يلزم تحديده صراحة أو إعادة تصميم الواجهة."
      },
      "multilevel": {
        "title": "وراثة متعددة المستويات",
        "explanation": "ترث Camera من Device التي ترث من Entity. يمرر المنشئ 7 عبر السلسلة لتهيئة Entity. تستخدم camera.id() الواجهة الموروثة، وتوفر capture() سلوك الكاميرا الخاص."
      },
      "hierarchical": {
        "title": "وراثة هرمية",
        "explanation": "تشترك Camera وSpeaker في نوع أساسي وليس كائن Device واحدًا. تحمل camera الرقم 2 وspeaker الرقم 3. لكل نسخة جزء أساسي مستقل وعملية خاصة."
      },
      "diamond": {
        "title": "وراثة هجينة / ماسية وأساس افتراضي",
        "explanation": "يجمع الشكل الماسي سلفًا مشتركًا ومسارين. ترث Camera وRadio افتراضيًا من Unit، فتحتوي Rover جزء Unit واحدًا تهيئه بالقيمة 9. يصل التحويلان إلى الجزء نفسه، لذا تطبع مقارنة العنوانين true. دون الوراثة الافتراضية سيكون هناك جزآن مختلفان من Unit."
      },
      "protected": {
        "title": "عام ومحمي وخاص",
        "explanation": "تبقي Meter الحقل raw_ خاصًا وتتيح raw() كعملية محمية للفئات المشتقة. تضيف CalibratedMeter::read() الرقم 2 إلى 40 فتعيد 42. يمكن للخارج استخدام read() دون raw() أو raw_. تمنح C++ أيضًا صلاحية للأصدقاء المعلنين، وللوصول المحمي قواعد إضافية تخص نوع الكائن."
      },
      "overloading": {
        "title": "تحميل زائد: اختيار وقت الترجمة",
        "explanation": "نوع 3 هو int فيختار المترجم show(int)، ونوع 3.5 هو double فيختار show(double). لا يكفي نوع الإرجاع وحده للتمييز بين التحميلات. لا يحتاج المثال إلى وراثة أو دوال افتراضية."
      },
      "overriding": {
        "title": "تجاوز: اختيار وقت التشغيل",
        "explanation": "Notifier مجردة لأن notify() افتراضية خالصة. تتلقى announce() مرجعًا للأساس يحافظ على كائن Screen أو Speaker الفعلي. يختار target.notify() تجاوزات مختلفة. يسمح المدمر الافتراضي بحذف آمن عبر مؤشر أساسي؛ هنا الكائنات تلقائية ولا نستخدم delete."
      }
    }
  },
  "ur": {
    "title": "OOP سمجھیں: چار خیالات، الگ کام",
    "intro": "پہلے خیال سمجھیں، پھر کوڈ سے جوڑیں اور ماڈل کے مراحل دیکھیں۔ OOP حالت اور رویہ اکٹھا کرتی ہے، مگر ہر ستون الگ ڈیزائن مسئلہ حل کرتا ہے۔",
    "meaning": "اس کا مطلب",
    "why": "کیوں استعمال کریں؟",
    "example": "اس کورس سے تعلق",
    "mistake": "عام غلطی",
    "question": "اپنی سمجھ جانچیں",
    "answer": "وضاحت دکھائیں",
    "foundations": "چار ستونوں سے پہلے",
    "foundationText": "کلاس آبجیکٹ کی ایک قسم بیان کرتی ہے؛ آبجیکٹ اپنی حالت رکھنے والی ایک مثال ہے۔ کنسٹرکٹر ابتدائی حالت طے کرتا ہے۔ میتھڈز اعمال بیان کرتے ہیں۔ ایک کلاس کے دو اکاؤنٹس کے بیلنس مختلف ہو سکتے ہیں۔ عوامی اعمال انٹرفیس بناتے ہیں؛ نجی تفصیلات عمل درآمد کا حصہ ہیں۔",
    "workshop": "C++ کی تفصیلی ورکشاپ",
    "workshopNote": "یہ الگ C++17 مثالیں کورس کو آگے بڑھاتی ہیں۔ تصور منتخب کریں، تعلق کا خاکہ دیکھیں اور وضاحت پڑھیں۔ مرکزی لیب منتخب پروگرامنگ زبان ہی استعمال کرتی ہے۔ تیر اخذ شدہ کلاس سے بنیادی کلاس کی طرف ہیں۔",
    "choose": "C++ کا تصور منتخب کریں",
    "trace": "مثال سمجھیں",
    "further": "مزید مطالعہ",
    "encapsulation": "انکیپسولیشن",
    "abstraction": "تجرید",
    "inheritance": "وراثت",
    "polymorphism": "پولی مورفزم",
    "pillars": {
      "encapsulation": {
        "meaning": "آبجیکٹ کے اصول اس کے ڈیٹا کے ساتھ رکھیں، اور حالت بدلنے والے ہر عمل سے ان اصولوں کی پابندی کرائیں۔",
        "why": "بینک اکاؤنٹ غلط رقم ایک ہی جگہ رد کر سکتا ہے، ہر بلانے والے پر جانچ کے لیے انحصار نہیں کرتا۔",
        "example": "اکاؤنٹ 100 سے شروع ہوتا ہے۔ deposit(25) شرط amount > 0 پوری کر کے 125 بناتا ہے۔ نجی رسائی کی مثال میں deposit(-10) رد ہوتا ہے۔ get_balance() بغیر تبدیلی قدر پڑھتا ہے۔",
        "mistake": "ہر فیلڈ کا getter اور setter بنانا اچھی انکیپسولیشن کی ضمانت نہیں۔ ہر بیلنس قبول کرنے والا setter غلط حالت کی اجازت دیتا ہے۔",
        "question": "دو اکاؤنٹس 100 سے شروع ہوتے ہیں۔ پہلے میں 25 جمع کریں۔ دوسرے میں کیا ہوگا؟",
        "answer": "100۔ ہر اکاؤنٹ کی الگ حالت ہے۔ صرف وصول کرنے والا آبجیکٹ بدلتا ہے؛ ایک کلاس ہونے کا مطلب تمام فیلڈز مشترک ہونا نہیں۔"
      },
      "abstraction": {
        "meaning": "ایک چھوٹا بامعنی عمل دیں جسے اندرونی مراحل ترتیب دیے بغیر استعمال کیا جا سکے۔",
        "why": "بلانے والا انجن شروع کرنے کو کہتا ہے؛ اسے تیاری کی ترتیب جاننے کی ضرورت نہیں۔ مستقل انٹرفیس کے پیچھے تفصیلات بدل سکتی ہیں۔",
        "example": "لیب start() بلاتی ہے، جو Started دکھانے سے پہلے _prepare() استعمال کرتا ہے۔ اندرونی کالز اور واپسی دیکھیں۔ C میں فنکشنز بغیر کلاسز ایسا انٹرفیس دیتے ہیں۔",
        "mistake": "تجرید اور انکیپسولیشن متعلق ہیں مگر سوال الگ ہیں: کون سا عمل چاہیے اور حالت کون بدل سکتا ہے؟ abstract کلاس ایک آلہ ہے، لازمی شرط نہیں۔",
        "question": "اگر _prepare() میں اندرونی جانچ بڑھے تو کیا start() کے تمام بلانے والے بدلیں گے؟",
        "answer": "نہیں، اگر start() وعدہ کیا گیا رویہ رکھے۔ بلانے والا انٹرفیس پر انحصار کرتا ہے؛ عمل درآمد تیاری سنبھالتا ہے۔"
      },
      "inheritance": {
        "meaning": "موجودہ بنیادی قسم سے مخصوص قسم بنائیں۔ C++ کی public وراثت میں اخذ شدہ آبجیکٹ بنیادی دستیاب انٹرفیس سے استعمال ہو سکتا ہے۔",
        "why": "وراثت تب استعمال کریں جب مخصوص قسم بنیادی معاہدہ پورا کرے۔ has-a تعلق کے لیے دوسرے آبجیکٹ کو ممبر رکھیں۔",
        "example": "Dog، Animal کو بڑھاتی ہے اور نام Milo رکھتی ہے۔ C میں ایک struct دوسری میں رکھی جاتی ہے: یہ ترکیب ہے، زبان کی وراثت نہیں۔",
        "mistake": "صرف کم لکھنے کے لیے وراثت نہ لیں۔ بنیادی معاہدہ توڑنا محفوظ استعمال مشکل کرتا ہے۔ متعدد وراثت میں مبہم نام اور دہرائے بنیادی حصوں کا خیال رکھیں۔",
        "question": "کلاس روم میں پروجیکٹر ہے۔ کیا Classroom کو Projector سے وراثت لینی چاہیے؟",
        "answer": "عموماً نہیں: کمرے کے پاس پروجیکٹر ہے، وہ خود پروجیکٹر نہیں۔ ممبر آبجیکٹ تعلق بہتر دکھاتا ہے۔"
      },
      "polymorphism": {
        "meaning": "ایک عمل کی مختلف شکلیں استعمال کریں۔ رن ٹائم پولی مورفزم اصل آبجیکٹ کے مطابق override چنتا ہے؛ C++ overloading کمپائل وقت کی اقسام سے دستخط چنتی ہے۔",
        "why": "لوپ مختلف آبجیکٹس کو بولنے کا کہہ سکتی ہے، ہر جانور کے لیے الگ شرط نہیں چاہیے۔",
        "example": "Dog اور Cat سے Woof اور Meow ملتے ہیں۔ C++ میں اصل بات بنیادی reference یا pointer سے virtual فنکشن بلانا ہے۔ ورکشاپ یہ راستہ دکھاتی ہے۔",
        "mistake": "ایک نام کافی نہیں۔ C++ کی بنیادی کلاس میں virtual اور اخذ شدہ میں override لگائیں۔ بنیادی pointer سے اخذ شدہ کو حذف کرنے کے لیے virtual destructor ضروری ہے۔",
        "question": "بنیادی reference اخذ شدہ آبجیکٹ کو دکھاتا ہے۔ virtual میتھڈ پر کون سا عمل چلے گا؟",
        "answer": "اصل اخذ شدہ آبجیکٹ کا آخری override۔ Overloading الگ ہے: پیرامیٹر کی اقسام رن ٹائم سے پہلے دستخط چنتی ہیں۔"
      }
    },
    "workshops": {
      "single": {
        "title": "واحد وراثت",
        "explanation": "Sensor کی ایک براہ راست بنیادی کلاس Device ہے۔ Sensor(7) پہلے Device حصہ بناتا ہے؛ id() وہاں سے 7 پڑھتا ہے، جبکہ Sensor کا اپنا read() عمل 42 دیتا ہے۔"
      },
      "multiple": {
        "title": "متعدد وراثت",
        "explanation": "FieldUnit کی دو بنیادی کلاسز کے الگ کام ہیں۔ report()، Sensor سے 21 لے کر Logger کو دیتا ہے۔ دونوں میں ایک ممبر نام ہو تو واضح کلاس نام لکھنا یا انٹرفیس بدلنا پڑ سکتا ہے۔"
      },
      "multilevel": {
        "title": "کئی سطحوں کی وراثت",
        "explanation": "Camera، Device سے اور Device، Entity سے وراثت لیتی ہے۔ کنسٹرکٹر 7 کو سلسلے سے Entity تک بھیجتا ہے۔ camera.id() وراثتی انٹرفیس اور capture() کیمرا کا خاص عمل ہے۔"
      },
      "hierarchical": {
        "title": "درجہ وار وراثت",
        "explanation": "Camera اور Speaker بنیادی قسم مشترک رکھتے ہیں، ایک Device آبجیکٹ نہیں۔ camera کا ID 2 اور speaker کا 3 ہے۔ ہر مثال کا بنیادی حصہ اور عمل الگ ہے۔"
      },
      "diamond": {
        "title": "ہائبرڈ / ڈائمنڈ اور ورچوئل بیس",
        "explanation": "ڈائمنڈ میں ایک مشترک اصل اور دو راستے ہیں۔ Camera اور Radio، Unit سے virtual وراثت لیتے ہیں، اس لیے Rover میں ایک Unit حصہ ہے۔ Rover اسے 9 سے بناتا ہے؛ دونوں تبدیلی کے راستے اسی حصے تک جاتے ہیں، لہٰذا پتوں کا موازنہ true دیتا ہے۔ virtual کے بغیر Unit کے الگ حصے ہوتے۔"
      },
      "protected": {
        "title": "عوامی، محفوظ اور نجی",
        "explanation": "Meter میں raw_ نجی ہے اور raw() اخذ شدہ کوڈ کے لیے protected عمل ہے۔ CalibratedMeter::read()، 40 میں 2 جمع کر کے 42 دیتا ہے۔ باہر سے read() استعمال ہو سکتا ہے، raw() یا raw_ نہیں۔ C++ میں اعلان کردہ friends کو بھی رسائی ہے؛ protected کے لیے آبجیکٹ کی قسم کے مزید قواعد ہیں۔"
      },
      "overloading": {
        "title": "Overloading: کمپائل وقت انتخاب",
        "explanation": "3 کی قسم int ہے اس لیے کمپائلر show(int) چنتا ہے۔ 3.5، double ہے اس لیے show(double) چنتا ہے۔ صرف واپسی کی قسم overload کو مختلف نہیں بناتی۔ یہاں وراثت یا virtual فنکشن ضروری نہیں۔"
      },
      "overriding": {
        "title": "Overriding: رن ٹائم انتخاب",
        "explanation": "Notifier تجریدی ہے کیونکہ notify() خالص virtual ہے۔ announce() بنیادی reference لیتا ہے جو اصل Screen یا Speaker آبجیکٹ برقرار رکھتا ہے۔ target.notify() مختلف overrides چنتا ہے۔ virtual destructor بنیادی pointer سے محفوظ حذف ممکن کرتا ہے؛ اس مثال میں خودکار آبجیکٹس ہیں اور delete نہیں ہے۔"
      }
    }
  },
  "hi": {
    "title": "OOP समझें: चार विचार, अलग काम",
    "intro": "पहले विचार समझें, उसे कोड से जोड़ें और मॉडल के चरण देखें। OOP स्थिति और व्यवहार को जोड़ती है, लेकिन हर स्तंभ अलग डिज़ाइन समस्या हल करता है।",
    "meaning": "इसका अर्थ",
    "why": "क्यों उपयोग करें?",
    "example": "इस पाठ्यक्रम से संबंध",
    "mistake": "आम गलती",
    "question": "अपनी समझ जाँचें",
    "answer": "व्याख्या दिखाएँ",
    "foundations": "चार स्तंभों से पहले",
    "foundationText": "क्लास एक प्रकार के ऑब्जेक्ट का वर्णन करती है; ऑब्जेक्ट अपनी स्थिति वाला एक इंस्टेंस है। कंस्ट्रक्टर प्रारंभिक स्थिति बनाता है। मेथड क्रियाएँ बताते हैं। एक क्लास के दो खातों में अलग शेष हो सकते हैं। सार्वजनिक क्रियाएँ इंटरफ़ेस बनाती हैं; निजी विवरण कार्यान्वयन का हिस्सा हैं।",
    "workshop": "C++ की विस्तृत कार्यशाला",
    "workshopNote": "ये स्वतंत्र C++17 उदाहरण पाठ्यक्रम को आगे बढ़ाते हैं। अवधारणा चुनें, संबंध चित्र देखें और व्याख्या पढ़ें। मुख्य लैब चुनी हुई प्रोग्रामिंग भाषा रखती है। तीर व्युत्पन्न क्लास से बेस क्लास की ओर हैं।",
    "choose": "C++ अवधारणा चुनें",
    "trace": "उदाहरण समझें",
    "further": "आगे पढ़ें",
    "encapsulation": "एनकैप्सुलेशन",
    "abstraction": "अमूर्तन",
    "inheritance": "इनहेरिटेंस",
    "polymorphism": "पॉलीमॉर्फिज़्म",
    "pillars": {
      "encapsulation": {
        "meaning": "ऑब्जेक्ट के नियम उसके डेटा के साथ रखें और स्थिति बदलने वाली हर क्रिया से नियमों का पालन कराएँ।",
        "why": "बैंक खाता गलत जमा को एक जगह अस्वीकार कर सकता है, हर कॉल करने वाले की जाँच पर निर्भर नहीं रहता।",
        "example": "खाता 100 से शुरू होता है। deposit(25), amount > 0 जाँच पास करके 125 बनाता है। निजी पहुँच उदाहरण में deposit(-10) अस्वीकार होता है। get_balance() बिना बदलाव पढ़ता है।",
        "mistake": "हर फ़ील्ड के getter और setter अच्छी एनकैप्सुलेशन की गारंटी नहीं हैं। कोई भी शेष स्वीकार करने वाला setter अमान्य स्थिति देता है।",
        "question": "दो खाते 100 से शुरू होते हैं। पहले में 25 जमा करें। दूसरे में कितना होगा?",
        "answer": "100। हर खाते की स्वतंत्र स्थिति है। सिर्फ़ प्राप्तकर्ता ऑब्जेक्ट बदलता है; एक क्लास होने का मतलब सभी फ़ील्ड साझा होना नहीं।"
      },
      "abstraction": {
        "meaning": "एक छोटी सार्थक क्रिया दें जिसे अंदरूनी चरणों का समन्वय किए बिना उपयोग किया जा सके।",
        "why": "कॉल करने वाला इंजन चालू करने को कहता है; उसे तैयारी का क्रम जानने की ज़रूरत नहीं। स्थिर इंटरफ़ेस के पीछे विवरण बदल सकते हैं।",
        "example": "लैब start() कॉल करती है, जो Started दिखाने से पहले _prepare() उपयोग करता है। नेस्टेड कॉल और वापसी देखें। C में फ़ंक्शन बिना क्लास ऐसा इंटरफ़ेस देते हैं।",
        "mistake": "अमूर्तन और एनकैप्सुलेशन जुड़े हैं, लेकिन प्रश्न अलग हैं: कौन सी क्रिया चाहिए और स्थिति कौन बदल सकता है? abstract क्लास एक साधन है, आवश्यक शर्त नहीं।",
        "question": "यदि _prepare() में अंदरूनी जाँच बढ़े, तो क्या start() के सभी कॉल बदलने होंगे?",
        "answer": "नहीं, यदि start() अपना वादा किया व्यवहार रखे। कॉल करने वाला इंटरफ़ेस पर निर्भर है; कार्यान्वयन तैयारी सँभालता है।"
      },
      "inheritance": {
        "meaning": "मौजूदा बेस प्रकार से विशेष प्रकार बनाएँ। C++ की public इनहेरिटेंस में व्युत्पन्न ऑब्जेक्ट उपलब्ध बेस इंटरफ़ेस से उपयोग हो सकता है।",
        "why": "इनहेरिटेंस तब चुनें जब विशेष प्रकार बेस अनुबंध पूरा करे। has-a संबंध में दूसरे ऑब्जेक्ट को सदस्य रखें।",
        "example": "Dog, Animal को बढ़ाती है और नाम Milo रखती है। C में एक struct दूसरी में रखी जाती है: यह संयोजन है, भाषा-स्तरीय इनहेरिटेंस नहीं।",
        "mistake": "केवल कम लिखने के लिए इनहेरिटेंस न चुनें। बेस अनुबंध तोड़ना सुरक्षित उपयोग कठिन बनाता है। अनेक इनहेरिटेंस में अस्पष्ट नाम और दोहराए बेस भागों का ध्यान रखें।",
        "question": "कक्षा में प्रोजेक्टर है। क्या Classroom को Projector से इनहेरिट करना चाहिए?",
        "answer": "आमतौर पर नहीं: कक्षा में प्रोजेक्टर है, वह स्वयं प्रोजेक्टर नहीं। सदस्य ऑब्जेक्ट संबंध बेहतर बताता है।"
      },
      "polymorphism": {
        "meaning": "एक क्रिया की अलग implementations उपयोग करें। रनटाइम पॉलीमॉर्फिज़्म वास्तविक ऑब्जेक्ट के अनुसार override चुनता है; C++ overloading संकलन-समय प्रकारों से signature चुनती है।",
        "why": "लूप कई ऑब्जेक्ट से बोलने को कह सकती है, हर जानवर के लिए अलग शाखा नहीं चाहिए।",
        "example": "Dog और Cat से Woof और Meow मिलते हैं। C++ में मुख्य बात बेस reference या pointer से virtual फ़ंक्शन कॉल करना है। कार्यशाला यह मार्ग दिखाती है।",
        "mistake": "एक जैसा नाम पर्याप्त नहीं। C++ बेस में virtual और व्युत्पन्न में override लगाएँ। पॉलीमॉर्फिक deletion के लिए बेस का virtual destructor चाहिए।",
        "question": "बेस reference व्युत्पन्न ऑब्जेक्ट को संदर्भित करता है। virtual मेथड पर कौन सा implementation चलेगा?",
        "answer": "वास्तविक व्युत्पन्न ऑब्जेक्ट का अंतिम override। Overloading अलग है: पैरामीटर प्रकार रनटाइम dispatch से पहले signature चुनते हैं।"
      }
    },
    "workshops": {
      "single": {
        "title": "एकल इनहेरिटेंस",
        "explanation": "Sensor की एक सीधी बेस क्लास Device है। Sensor(7) पहले Device भाग बनाता है; id() उससे 7 पढ़ता है, जबकि Sensor का अपना read() 42 लौटाता है।"
      },
      "multiple": {
        "title": "अनेक इनहेरिटेंस",
        "explanation": "FieldUnit की दो बेस क्लास की अलग ज़िम्मेदारियाँ हैं। report(), Sensor से 21 लेकर Logger को देता है। दोनों में समान सदस्य नाम हो तो स्पष्ट क्लास नाम लिखना या इंटरफ़ेस बदलना पड़ सकता है।"
      },
      "multilevel": {
        "title": "बहुस्तरीय इनहेरिटेंस",
        "explanation": "Camera, Device से और Device, Entity से इनहेरिट करती है। कंस्ट्रक्टर 7 को श्रृंखला से Entity तक पहुँचाता है। camera.id() विरासत वाला इंटरफ़ेस है और capture() कैमरे का अपना व्यवहार है।"
      },
      "hierarchical": {
        "title": "पदानुक्रमित इनहेरिटेंस",
        "explanation": "Camera और Speaker एक बेस प्रकार साझा करते हैं, एक Device ऑब्जेक्ट नहीं। camera का ID 2 और speaker का 3 है। हर इंस्टेंस का अपना बेस भाग और क्रिया है।"
      },
      "diamond": {
        "title": "हाइब्रिड / डायमंड और virtual बेस",
        "explanation": "डायमंड में एक साझा पूर्वज और दो मार्ग हैं। Camera और Radio, Unit से virtual इनहेरिट करते हैं, इसलिए Rover में एक Unit भाग है। Rover उसे 9 से बनाता है; दोनों रूपांतरण उसी भाग तक पहुँचते हैं और पते की तुलना true देती है। virtual के बिना अलग Unit भाग होते।"
      },
      "protected": {
        "title": "सार्वजनिक, संरक्षित और निजी",
        "explanation": "Meter में raw_ निजी है और raw() व्युत्पन्न कोड के लिए protected क्रिया है। CalibratedMeter::read(), 40 में 2 जोड़कर 42 देता है। बाहर से read() उपयोग हो सकता है, raw() या raw_ नहीं। C++ घोषित friends को भी पहुँच देती है; protected के लिए ऑब्जेक्ट प्रकार के अतिरिक्त नियम हैं।"
      },
      "overloading": {
        "title": "Overloading: संकलन-समय चयन",
        "explanation": "3 का प्रकार int है, इसलिए कंपाइलर show(int) चुनता है। 3.5 double है, इसलिए show(double) चुनता है। केवल return प्रकार overload को अलग नहीं बनाता। यहाँ इनहेरिटेंस या virtual फ़ंक्शन आवश्यक नहीं।"
      },
      "overriding": {
        "title": "Overriding: रनटाइम चयन",
        "explanation": "Notifier अमूर्त है क्योंकि notify() शुद्ध virtual है। announce() बेस reference लेता है जो वास्तविक Screen या Speaker ऑब्जेक्ट रखता है। target.notify() अलग overrides चुनता है। virtual destructor बेस pointer से सुरक्षित deletion देता है; यहाँ स्वचालित ऑब्जेक्ट हैं और delete नहीं है।"
      }
    }
  },
  "zh": {
    "title": "理解面向对象：四种思想，各有用途",
    "intro": "先理解概念，再联系代码，最后逐步观察模型。面向对象把状态与行为放在一起，但四个支柱解决不同的设计问题。",
    "meaning": "含义",
    "why": "为什么使用？",
    "example": "联系本课程",
    "mistake": "常见误区",
    "question": "检查理解",
    "answer": "显示解释",
    "foundations": "四个支柱之前",
    "foundationText": "类描述一种对象；对象是具有自身状态的实例。构造函数建立初始状态，方法描述操作。同一个类的两个账户可以有不同余额。公开操作构成接口，私有细节属于实现。",
    "workshop": "C++ 深入实践",
    "workshopNote": "这些独立的 C++17 示例扩展了课程。选择概念，查看关系图并阅读解释。下方主实验仍使用你选择的编程语言。箭头由派生类指向基类。",
    "choose": "选择 C++ 概念",
    "trace": "理解示例",
    "further": "延伸阅读",
    "encapsulation": "封装",
    "abstraction": "抽象",
    "inheritance": "继承",
    "polymorphism": "多态",
    "pillars": {
      "encapsulation": {
        "meaning": "把对象的规则与数据放在一起，并要求所有改变状态的操作遵守规则。",
        "why": "银行账户可以在一个地方拒绝无效存款，而不必依赖每个调用者自行检查。",
        "example": "账户从 100 开始。deposit(25) 通过 amount > 0 检查，得到 125。私有访问示例拒绝 deposit(-10)。get_balance() 只读取而不修改。",
        "mistake": "为每个字段添加 getter 和 setter 并不等于良好封装。接受任意余额的 setter 仍允许无效状态。",
        "question": "两个账户都从 100 开始。向第一个存入 25，第二个余额是多少？",
        "answer": "100。每个账户有独立状态，只有接收操作的对象改变。同一个类并不意味着所有字段共享。"
      },
      "abstraction": {
        "meaning": "提供一个简洁、有意义的操作，让调用者无需协调内部步骤。",
        "why": "调用者请求启动引擎，不必知道准备工作的顺序。实现细节可以在稳定接口之后变化。",
        "example": "引擎实验调用 start()，它先使用 _prepare()，再输出 Started。跟随嵌套调用及返回。C 通过函数提供类似接口，无需类。",
        "mistake": "抽象与封装有联系，但问题不同：调用者需要什么操作，谁能改变状态？抽象类是工具之一，不是抽象的必要条件。",
        "question": "如果 _prepare() 增加内部检查，所有 start() 调用者都要修改吗？",
        "answer": "只要 start() 保持承诺的行为，就不需要。调用者依赖接口，实现负责准备工作。"
      },
      "inheritance": {
        "meaning": "在已有基类的基础上定义专门的类型。C++ 公开继承允许通过可访问的基类接口使用派生对象。",
        "why": "当专门类型确实满足基类约定时使用继承。“拥有一个”的关系通常应保存成员对象。",
        "example": "课程中的 Dog 扩展 Animal，名字是 Milo。C 的对应示例把一个结构体放入另一个结构体，这是组合，不是语言层面的继承。",
        "mistake": "不要只为少写代码而继承。破坏基类约定的派生类型难以安全使用。多重继承还需注意名称歧义和重复基类子对象。",
        "question": "教室里有投影仪，Classroom 应继承 Projector 吗？",
        "answer": "通常不应。教室拥有投影仪，而不是一种投影仪。用成员对象表达更清楚。"
      },
      "polymorphism": {
        "meaning": "同一操作可以有不同实现。运行时多态按实际对象选择覆盖函数；C++ 重载按编译时类型选择签名。",
        "why": "循环可以让不同对象发声，而不必为每种动物写分支。",
        "example": "Dog 和 Cat 分别产生 Woof 和 Meow。C++ 的关键是通过基类引用或指针调用虚函数，实践区明确展示这条路径。",
        "mistake": "同名方法不足以产生 C++ 动态分派。基类用 virtual，派生类用 override。通过基类进行多态删除需要虚析构函数。",
        "question": "基类引用指向派生对象，调用虚方法时执行哪个实现？",
        "answer": "实际派生对象的最终覆盖函数。重载则不同：参数类型先选择签名，然后才可能发生运行时分派。"
      }
    },
    "workshops": {
      "single": {
        "title": "单继承",
        "explanation": "Sensor 只有一个直接基类 Device。Sensor(7) 先初始化 Device 部分，id() 从基类读取 7，而 Sensor 自己的 read() 返回 42。"
      },
      "multiple": {
        "title": "多重继承",
        "explanation": "FieldUnit 有两个职责不同的直接基类。report() 从 Sensor 取得 21 并交给 Logger。如果两个基类有同名成员，可能需要明确限定名称或重新设计接口。"
      },
      "multilevel": {
        "title": "多层继承",
        "explanation": "Camera 继承 Device，Device 继承 Entity。构造函数沿继承链传递 7 来初始化 Entity。camera.id() 使用继承的接口，capture() 提供相机特有行为。"
      },
      "hierarchical": {
        "title": "层次继承",
        "explanation": "Camera 与 Speaker 共享基类类型，而非同一个 Device 对象。camera 的 ID 为 2，speaker 的 ID 为 3。每个实例有独立的基类子对象及自己的操作。"
      },
      "diamond": {
        "title": "混合／菱形与虚基类",
        "explanation": "菱形把共同祖先与两条继承路径结合起来。Camera 和 Radio 均虚继承 Unit，因此 Rover 只有一个 Unit 子对象，由 Rover 用 9 初始化。两条转换路径到达同一子对象，地址比较输出 true。不使用虚继承时则有不同的 Unit 子对象。"
      },
      "protected": {
        "title": "公开、受保护与私有",
        "explanation": "Meter 将 raw_ 保持为私有，向派生代码提供受保护操作 raw()。CalibratedMeter::read() 把 40 加 2，返回 42。外部只能用 read()，不能用 raw() 或 raw_。C++ 也向声明的友元授予访问权；protected 还有涉及对象类型的附加规则。"
      },
      "overloading": {
        "title": "重载：编译时选择",
        "explanation": "3 的类型为 int，编译器选择 show(int)；3.5 为 double，选择 show(double)。仅返回类型不同不足以构成重载。本例不需要继承或虚函数。"
      },
      "overriding": {
        "title": "覆盖：运行时选择",
        "explanation": "Notifier 因 notify() 为纯虚函数而成为抽象类。announce() 接受基类引用，保留实际 Screen 或 Speaker 对象。同一 target.notify() 调用选择不同覆盖函数。虚析构函数还支持通过基类指针安全删除；本例使用自动对象，没有 delete。"
      }
    }
  }
};if(typeof module==='object'&&module.exports)module.exports=locales;else root.OOPGuideData=locales;})(typeof window==='undefined'?globalThis:window);
