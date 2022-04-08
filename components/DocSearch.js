import { DocSearch } from '@docsearch/react';
import '@docsearch/css';

const translations = {
  button: {
    buttonText: 'Suche',
    buttonAriaLabel: 'Suche',
  },
  modal: {
    searchBox: {
      resetButtonTitle: 'Suche zurücksetzen',
      resetButtonAriaLabel: 'Suche zurücksetzen',
      cancelButtonText: 'Abbrechen',
      cancelButtonAriaLabel: 'Abbrechen',
    },
    startScreen: {
      recentSearchesTitle: 'Letzte Suchen',
      noRecentSearchesText: 'Keine letzten Suchen',
      saveRecentSearchButtonTitle: 'Suche speichern',
      removeRecentSearchButtonTitle: 'Suche aus der Liste entfernen',
      favoriteSearchesTitle: 'Favorit',
      removeFavoriteSearchButtonTitle:
        'Suche von Favoriten entfernen',
    },
    errorScreen: {
      titleText: 'Kann keine Suche starten',
      helpText: 'Bitte Netzwerkverbindung prüfen',
    },
    footer: {
      selectText: 'auswählen',
      selectKeyAriaLabel: 'Eingabetaste',
      navigateText: 'navigieren',
      navigateUpKeyAriaLabel: 'Pfeil nach oben',
      navigateDownKeyAriaLabel: 'Pfeil nach unten',
      closeText: 'schließen',
      closeKeyAriaLabel: 'Escape-Taste',
      searchByText: 'Suche von',
    },
    noResultsScreen: {
      noResultsText: 'Keine Ergebnisse für',
      suggestedQueryText: 'Versuche zu suchen nach',
      reportMissingResultsText:
        'Sollte diese Suchanfrage Ergebnisse liefern?',
      reportMissingResultsLinkText: 'Bitte mitteilen.',
    },
  },
};

const MySearch = () => {
  return (
    <DocSearch
      appId="EPTBHABXXP"
      indexName="progcontent"
      apiKey="9dedea8aa934e41c3f535174cd7f5e7c"
      placeholder="Suche…"
      translations={translations}
    />
  );
};

export default MySearch;
