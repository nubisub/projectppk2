import {useEffect, useState} from "react";
import httpClient from "../../../httpClient";
import WebView from "react-native-webview";
import * as React from "react";

function DetailsScreen({route, navigation}) {
    const { itemId } = route.params;
    const [data, setData] = useState({});
    useEffect(() => {
        httpClient.getKontenById((itemId)).then((response) => {
            response.content = '<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><style> img { display: block; max-width: 100%; height: auto; } *{overflow: scroll; word-wrap: break-word;} body{margin: 10px 15px} </style></head><body><h1 style="font-size: 1.7em;margin-top: 15px ">'+ response.title +'</h1>' + response.content + '</body></html>';
            setData(response);
        });
    });
    return (
        <>
            <WebView originWhitelist={['*']} source={{ html : data.content }}
            />
        </>
    );
}
export default DetailsScreen;