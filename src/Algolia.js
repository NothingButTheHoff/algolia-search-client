import React, {useEffect, useState} from "react";
import algoliasearch from 'algoliasearch';
import './App.css';
import ResultItem from "./ResultItem";


const client = algoliasearch('*********', '**********************');
const index = client.initIndex('products_vinmonopolet');

index.setSettings({
    searchableAttributes: [
        'name',
        'aroma',
        'country',
    ],
    attributesToHighlight: [],
}).then(() => {
    console.info("Index settings updated")
});

const options = {
    hitsPerPage: 10,
    attributesToRetrieve: [
        "*",
        "-date",
    ],
};

function Algolia() {
    const [searchValue, setSearchValue] = useState("");
    const [result, setResult] = useState([]);
    const [searchStats, setSearchStats] = useState(null);

    useEffect(() => {
        index.search(searchValue, options).then(({ hits, nbHits, processingTimeMS }) => {
            setResult(hits);
            setSearchStats({nbHits, processingTimeMS})
        });
    }, [searchValue]);

    return (
        <div>
            <h1>Algolia Search</h1>

            <div className="search-container">
                {searchStats && <div className="search-stats">Fant <b>{searchStats.nbHits}</b> på {searchStats.processingTimeMS} ms</div>}
                <input type="text" value={searchValue} onChange={e => setSearchValue(e.target.value)} placeholder="Søk etter noe deilig alkohol"/>
                <div className="results">
                    {result.map(item => <ResultItem item={item} />)}
                </div>
            </div>
        </div>
    );
}

export default Algolia;
