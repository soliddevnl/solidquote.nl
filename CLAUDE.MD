# SolidQuote.nl

## Project Overview
Een minimalistische stoïcijnse quote website. De site toont dagelijks 5 verschillende stoïcijnse quotes in het Engels. Gebruikers kunnen met een knop door de quotes navigeren. Het design is rustig en stoïcijns, zonder overbodige features.

## Project Structure
```
/
├── index.html                    # Main page met quote display
├── style.css                     # Rustig, minimalistisch design
├── script.js                     # Quote navigatie logica (laadt quotes/daily.json)
├── CNAME                         # GitHub Pages custom domain config
├── quotes/
│   ├── pool.json                 # Pool van 30 stoïcijnse quotes
│   ├── daily.json                # 5 geselecteerde quotes voor vandaag
│   └── select-daily.js           # Script om dagelijks 5 random quotes te selecteren
├── .github/
│   └── workflows/
│       ├── deploy.yml            # Automatische deployment naar GitHub Pages
│       └── update-quotes.yml     # Dagelijkse quote selectie (00:00 UTC)
└── CLAUDE.MD                     # This file
```

## Technology Stack
- Pure HTML, CSS, JavaScript (geen frameworks)
- GitHub Pages voor hosting
- GitHub Actions voor automatische deployment en dagelijkse quote updates
- Custom domain: solidquote.nl

## Features
- 5 stoïcijnse quotes in het Engels
- Dagelijks automatisch nieuwe quote selectie via GitHub Actions
- Eenvoudige navigatie met "Volgende" knop
- Cyclische navigatie (na quote 5 terug naar quote 1)
- Paginator indicator (1/5, 2/5, etc.)
- Link naar LinkedIn en GitHub source code in footer
- Responsive design
- Minimalistisch, rustig design

## Design Philosophy
- Eenvoud boven complexiteit
- Rustige kleuren (beige achtergrond, donkergrijs tekst)
- Serif font (Georgia) voor klassieke uitstraling
- Geen afleidingen of onnodige features
- Focus op de quotes zelf

## How Daily Quotes Work
1. GitHub Action draait dagelijks om 00:00 UTC (`update-quotes.yml`)
2. Script `quotes/select-daily.js` selecteert random 5 quotes uit `quotes/pool.json`
3. Geselecteerde quotes worden geschreven naar `quotes/daily.json`
4. Action commit en pusht de nieuwe `daily.json`
5. Bestaande deploy workflow deployt automatisch
6. Site laadt de nieuwe quotes via fetch

## Quote Pool
De `quotes/pool.json` bevat 30 stoïcijnse quotes van:
- Marcus Aurelius
- Epictetus
- Seneca

De pool kan eenvoudig uitgebreid worden door meer quotes toe te voegen aan `quotes/pool.json`.
