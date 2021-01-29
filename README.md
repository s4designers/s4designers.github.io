# S4D-lesmateriaal

**Lesmateriaal voor de minor Scripting voor Designers**


De site wordt nu gehost in het Firebase project [**s4d-inbox**](https://console.firebase.google.com/project/s4d-inbox/overview). Peter Schulz, Sander Leer, Robert Holwerda en Jille Treffers zijn daar nu eigenaar van. Voor studenten en bezoekers is dit de _publieke site_:

[elk.scripting.school](https://dingo.scripting.school) _(cohort feb. 2021)_

of, synoniem:

[s4d-course.web.app](https://s4d-course.web.app) _(generiek firebase domain)_

Daarnaast is er een tweede Firebase project (zelfde eigenaren) voor ontwikkelen en testen: [**s4d-inbox-dev**](https://console.firebase.google.com/project/s4d-inbox-dev/overview). De bijbehorende _development site_ voor lesmateriaal is [https://s4d-course-dev.web.app](https://s4d-course-dev.web.app). Niet voor studenten en gasten :-)


## Deploying

Na edits in lesmateriaal of code, is een push naar github niet (meer) voldoende om te deployen. Dat moet via de firebase commandline. Die moet globaal geinstalleerd zijn:

```bash
npm install -g firebase-tools
```

**:warning: Gebruik vervolgens :bangbang:niet:bangbang: het standaard _`firebase deploy`_ commando!**. Gebruik dit shellscript in de root van de repo:

```bash
./deploy.sh
```
(wellicht het script eerst executable maken: `chmod u+x  deploy.sh`)

Dit script zal de `master`-branch naar de publieke site ([s4d-course.web.app](https://s4d-course.web.app)) deployen, en alle andere branches naar de developmentsite ([https://s4d-course-dev.web.app](https://s4d-course-dev.web.app)).

Wijzigingen in les-content kunnen we gewoon in master maken en dan pushen naar Github en deployen naar de publieke site met:
```bash
./deploy.sh
```

Klooien met code en database doen we nu in aparte branches, zodat deployments eerst naar de development site gaan. Als de code afdoende getest is: mergen in de `master`-branch en dan vanuit `master` deployen naar publieke site.

## Previewen voor deployment

Zodra de Firebase database code en de Github authentication gemerged zijn in de `master`-branch, kun je de site lokaal alleen nog bekijken met behulp van een soort firebase-hosting-emulator.

Ook dat gaat met een shellscript:
```bash
./serve.sh
```
(wellicht het script eerst executable maken: `chmod u+x  serve.sh`)

Hiermee wordt een lokale http-server gestart waamee de static content (en, ooit misschien, de cloud functions) lokaal te gebruiken zijn. _Maar de database is nog **wel de online Firestore**_. Die wordt niet lokaal ge-emuleerd.

Vandaar het `./serve.sh` script. Net als `./deploy.sh` kijkt-ie naar de huidige git-branch. Als je emuleert terwijl je de `master`-branch actief hebt, dan zal de lokale software toch de productie-database gebruiken. In alle andere branches wordt de database van het development-project gebruikt. (Dit is wellicht niet helemaal handig, maar een betere oplossing komt later.)

## Chapters schrijven

Dit zijn de custom tags die er zijn voor het maken van hoofdstukken en opdrachten. En de constructies waarin ze gebruikt kunnen worden.

### Aantekeningen van auteurs (custom tags)

De eerste twee custom tags, `<todo>` en `<note>` zijn bedoeld voor het schrijfproces, en zouden niet door studenten gezien moeten worden :-).

```html
<todo>
  Dit is een heel verhaal over dingen die nog gedaan moeten worden.
</todo>
```

`<todo>`-tags zijn block-level elementen: hele paragraven, of meer. Kan van allerlei HTML bevatten.

```html
<note>
  Dit is een opmerking die specifiek is voor een plek in lopende tekst.
</note>
```

`<note>`-tags zijn inline, en bedoeld voor b.v. redactie-opmerkingen. Ze tonen een groen in de lopende tekst, en de inhoud wordt zichtbaar als je je muiscursor boven dat blokje laat zweven. 

### Hoofdstuk titels

Het eerste `<h1>`-element wordt als hoofdstuktitel gezien. Het wordt geacht te beginnen met een nummer. Achter dat nummer kan een dubbele punt staan en ervoor kan het woord "Chapter" staan. Dubbele punt en "Chapter" zijn beide optioneel.

```html
<h1>23 Monads are Monoids in the Category of Endofunctors</h1>
```
of
```html
<h1>Chapter 23: Monads are Monoids in the Category of Endofunctors</h1>
```


### Video (custom class)

Een youtube video hangen we zo in een hoofdstuk:

```html
  <youtube ytid="RKs3r-uXTUc"/></youtube>
```

Het `<youtube>`-element kan geen content bevatten tussen de tags.
Net als alle andere custom-tags, moet je een separate eind-tag gebruiken, ondanks dat er geen content in je `<youtube>` tag zit. Dus niet `<youtube />` of domweg `<youtube>`, maar `<youtube></youtube>`.


### Attention, Theory, Instruction (css classes)
Een class om een `<section>` (of <div> o.i.d.) te maken met afwijkende kleuren waarvan de inhoud extra aandacht moet opeisen.

```html
<div class="attention">
  <p>This text should be read carefully!!</p>
</div>
```
```html
<div class="theory">
  <p>You should know this.</p>
</div>
```
```html
<div class="instruction">
  <p>You should do things like this.</p>
</div>
```

Qua verticale spacing is het het mooiste als content in een extra-aandacht-element in verpakt is in block-elementen (e.g `<p>`, `<h3>`, `<table>`, etc). Zie voorbeelden hierboven.

### Assigments (css class)
Een section die een huiswerkvraag aan gebruikers presenteert.

```html
<section class="assignment">
    <h3 class="assignment questions">2.2 Title of the assignment</h3>
    <p>...</p>
    <answer noslider buttontext="Mail your word list"></answer>
</section>
```

Een assignment bevat typisch drie dingen:
1. **Een eerste element dat begint met een opdracht nummer**. Zie voorbeeld. Mag ook een `<p>` element o.i.d. zijn. Dit opdrachtnummer wordt gebruikt in de subject van de mail die studenten versturen.  
 Het opdrachtnummer kan van alles zijn, bv. '4.2', '4.2.a', '13.eerste-bonus.stap-1' etc. Alles voor de eerste spatie telt als opdrachtnummer.

1. **De content van de opdrachtbeschrijving**. Kan van alles zijn.
1. Optioneel: **een `<answer>` element** dat nadere specs bevat over het inlever-blokje in de opdracht. Zie volgend tussenkopje. Als het `<answer>`-element ontbreekt wordt er een default element aan het einde toegevoegd. 

### Subquestions (HTML pattern)
Sommige opdrachten bestaan uit een aantal sub-vragen. Die subvragen kunnen opgenomen worden in de antwoord-mail door ze te verpakken in een specifiek soort lijst:

```html
<ol type="a">
  <li>Where were you on the night of the murder?</li>
  <li>Where did you hide the body?</li>
  <li>Why did you do it?</li>
</ol>
```
Het type-attribuut (type="a") is belangrijk. Dat moet er zijn, _en_ de waarde "a" hebben. Anders wordt de lijst niet opgepikt als een set subvragen.

### Answers (custom tag)
`<answer>`-elementen moeten in assignment-secties zitten. Ze gebruiken het nummer vooran in het eertse child-element van de assignment-sectie om het opdrachtnummer uit te destilleren. Een `<answer>`-element kan een paar attributen en content krijgen, die allemaal optioneel zijn:

```html
<answer noslider buttontext="Send in your poem">Use this elegant button to share your art:</answer>
```

* _Optioneel:_ De **inhoud tussen de tags** is de instructie die getoond wordt boven de button (en de optionele slider). Er zijn default instructies voor zowel de versie zonder slider, als de versie met slider.

* _Optioneel:_ Het **noslider** attribuut onderdrukt de slider waarmee studenten kunnen aangeven hoe goed ze denken de opdracht gemaakt te hebben.
* _Optioneel:_ Het **buttontext="..."** attribuut kan gebruikt worden om een custom label op de instuur-knop de zetten. De default waarde is _"Mail your work"_.

Net als alle andere custom-tags, moet je een separate eind-tag gebruiken, ook als er geen content in je `<answer>` tag zit. Dus niet `<answer />` of domweg `<answer>`, maar `<answer></answer>`.

### Download button (custom tag)
De `<download ...></download>`-tag maakt een knop waarmee gebruikers files kunnen downloaden naar hun eigen computer. Er zijn twee attributen:

```html
<download href="theFileName.zip" buttontext="click to get the good stuff!" >
```
* _Verplicht:_ Het **href="..."** attribuut verwijst naar de file die gedownload kan worden. Het is OK dit een pad is, en als hierin spaties gebruikt worden.
* _Optioneel:_ Het **buttontext="..."** attribuut bepaalt de tekst die op de knop staat. De default waarde is "Download _filenaam_" 

Het `<download>`-element kan geen content bevatten tussen de tags.
Net als alle andere custom-tags, moet je een separate eind-tag gebruiken, ondanks dat er geen content in je `<download>` tag zit. Dus niet `<download />` of domweg `<download>`, maar `<download></download>`.

### Code blokken (speciaal html patroon + attribuut)

Code blokken zien er nu zo uit:

```html
<script type="text/plain" class="language-html">
  ...
</script>
```

Dus niet meer: `<pre><code>` combinaties. Dit om de highlighter ook voor HTML code te laten werken.

**LET OP:** Er is geen enkele manier om HTML-text in een HTML file op te nemen zonder dat de HTML-parser van de browser er aan wil zitten. Alle workarounds hebben een nadeeltje. Het nadeeltje van deze oplossing is dat **als je codevoorbeeld zelf een `<script>`-tag bevat, je de afsluitende tag moet 'escapen':** schrijf in de voorbeeld code niet "`</script>`" maar "**`&lt;/script>`**". 

In het `class`-attribuut geef je de taal aan die door de syntax highlighter gebruikt moet worden. Dit zijn de talen die nu ondersteund worden:
* **`lanuage-html`**
* `language-markup` _(identiek aan language-html)_
* `language-javascript`
* **`language-js`** _(identiek)_
* **`language-arduino`**
* `language-cpp`
* `language-c`

Regels kunnen een highlight krijgen door het `data-line="..."` attribuut te gebruiken. Syntaxvoorbeelden voor `data-line` zijn:
* `dataline="5"` -- highlight regel 5
* `dataline="1-5"` -- highlight regel 1 t/m 5
* `dataline="1,4"` -- highlight regel 1 en 4
* `dataline="1-3, 5, 9-20"` -- highlight regels 1 t/m 3, regel 5 en regels 9 t/m 20.

### including HTML (custom attributes)
Stukken van andere HTML pagina's (of hele pagina's) kunnen worden ingeladen als deel van de huidige pagina.

```html
<div include="../cheatsheet.html#data-types"></div>
```

De gevraagde HTML-file wordt ge-ajaxed, en ingevoegd als innerHTML van de tag met het include attribuut. In dit voorbeeld eindigt de URL met een _fragment identifier_ (`#data-types`), waardoor alleen het element (in de geladen HTML) met het `id` dat overeenkomt met de fragment identifier wordt opgenomen in de huidige pagina.

Als de URL geen fragment identifier bevat, wordt de inhoud van de hele body opgenomen.

__Note__: JavaScript en CSS uit de op te nemen HTML-file wordt genegeerd.

__Note__: De huidige implementatie van het `include`-attribuut werkt alleen voor HTML content. Je kunt het niet gebruiken om b.v. source-code op te nemen.


#### select- en reject-attributen

Flexibeler dan fragment identifiers is het `select`-attribuut dat naast het `include`-attribuut gebruikt kan worden. 

```html
<div include="../cheatsheet.html" select="#for-loops .arduino, #while-loops .arduino" ></div>
```

In dit voorbeeld zouden alle elementen in de `for-loop` en `while-loop` secties worden opgenomen met de class 'arduino`. Alle CSS selectoren kunnen gebruikt worden.

Ook het `reject`-attribuut kan gebruikt worden met het `include` element, en verwacht een CSS3-selector als waarde. Elementen die matchen met de `reject`-selector worden verwijderd uit het resultaat voordat het wort opgenomen in de pagina.

```html
<div include="../agenda.html" reject=".unpublished"></div>
```

Dit zal alle elementen met class 'unpublished' verwijderen uit de op te nemen HTML.

__Note__: Het `reject`-attribuut kan worden gecombineerd met een fragment identifier of een `select`-attribuut. Het `reject`-attribuut wint altijd.


