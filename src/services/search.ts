import { Client } from "typesense";

const client = new Client({
    apiKey: "nM6ivXxc7QhyS9CohdR2tNnkiFeteNZa",
    nodes: [
        {
            host: "wxgl7vhp2eb6uyj4p-1.a1.typesense.net",
            port: 443,
            protocol: "https",
        },
    ],
});

export function search(q: string) {
    return client.collections("companies").documents().search({
        query_by: "name,description,stripe_metadata_seller",
        q,
    });
}

export function searchBySellerName(q: string) {
    return client.collections("companies").documents().search({
        query_by: "stripe_metadata_seller",
        q,
    });
}

export function searchIntoProducts(
    q: string,
    type: "default" | "seller" = "default"
) {
    const function_name = type === "default" ? search : searchBySellerName;
    return function_name(q).then((value) =>
        value.hits?.map((value) => value.document)
    );
}
