import { DocSearch } from '@docsearch/react';
import '@docsearch/css';

const MySearch = () => {
  return (
    <DocSearch
      appId="EPTBHABXXP"
      indexName="progcontent"
      apiKey="9dedea8aa934e41c3f535174cd7f5e7c"
    />
  );
}

export default MySearch;
