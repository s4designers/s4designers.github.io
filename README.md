# S4D-lesmateriaal

Lesmateriaal voor de minor Scripting voor Designers

## Chapters schrijven

Dit zijn de custom tags die er zijn voor het maken van hoofdstukken en opdrachten. En de constructies waarin ze gebruikt kunnen worden.

#### Video (custom class)

Een youtube video hangen we zo in een hoofdstuk:

```html
  <youtube data-ytid="RKs3r-uXTUc"/></youtube>
```

Het `<youtube>`-element kan geen content bevatten tussen de tags.
Net als alle andere custom-tags, moet je een separate eind-tag gebruiken, ondanks dat er geen content in je `<youtube>` tag zit. Dus niet `<youtube />` of domweg `<youtube>`, maar `<youtube></youtube>`.


#### Attention (css class)
Een class om een `<section>` te maken met afwijkende kleuren waarvan de inhoud extra aandacht moet opeisen.

```html
<section class="attention">
  <p> This text should be read carefully!!</p>
</section>
```

Qua verticale spacing is het het mooiste als content in `.attention`-element in block-elementen (e.g `<p>`, `<h3>`, `<table>`, etc) is verpakt. Zie voorbeeld hierboven.

#### Assigments (css class)
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

#### Answers (custom tag)
`<answer>`-elementen moeten in assignment-secties zitten. Ze gebruiken het nummer vooran in het eertse child-element van de assignment-sectie om het opdrachtnummer uit te destilleren. Een `<answer>`-element kan een paar attributen en content krijgen, die allemaal optioneel zijn:

```html
<answer noslider butontext="Send in your poem">Use this elegant button to share your art:</answer>
```

* _Optioneel:_ De **inhoud tussen de tags** is de instructie die getoond wordt boven de button (en de optionele slider). Er zijn default instructies voor zowel de versie zonder slider, als de versie met slider.

* _Optioneel:_ Het **noslider** attribuut onderdrukt de slider waarmee studenten kunnen aangeven hoe goed ze denken de opdracht gemaakt te hebben.
* _Optioneel:_ Het **buttontext="..."** attribuut kan gebruikt worden om een custom label op de instuur-knop de zetten. De default waarde is _"Mail your work"_.

Net als alle andere custom-tags, moet je een separate eind-tag gebruiken, ook als er geen content in je `<answer>` tag zit. Dus niet `<answer />` of domweg `<answer>`, maar `<answer></answer>`.

#### Download button (custom tag)
De `<download ...></download>`-tag maakt een knop waarmee gebruikers files kunnen downloaden naar hun eigen computer. Er zijn twee attributen:

```html
<download href="theFileName.zip" buttontext="click to get the good stuff!" >
```
* _Verplicht:_ Het **href="..."** attribuut verwijst naar de file die gedownload kan worden. Het is OK dit een pad is, en als hierin spaties gebruikt worden.
* _Optioneel:_ Het **buttontext="..."** attribuut bepaalt de tekst die op de knop staat. De default waarde is "Download _filenaam_" 

Het `<download>`-element kan geen content bevatten tussen de tags.
Net als alle andere custom-tags, moet je een separate eind-tag gebruiken, ondanks dat er geen content in je `<download>` tag zit. Dus niet `<download />` of domweg `<download>`, maar `<download></download>`.

#### Code blokken (speciaal html patroon + attribuut)

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

## Web preview

The site is currently hosted on Github itself: [https://hanica.github.io/S4D-lesmateriaal/](https://hanica.github.io/S4D-lesmateriaal/)