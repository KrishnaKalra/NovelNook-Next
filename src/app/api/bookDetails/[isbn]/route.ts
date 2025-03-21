import { NextResponse,NextRequest } from "next/server";
import axios from "axios";
export async function GET(request: NextRequest, { params }: { params: { isbn: string } }) {
    try {
        console.log(params);
        const  isbn  =  params.isbn;
        console.log("Fetching details for ISBN:", isbn);

        const link = `http://openlibrary.org/api/volumes/brief/isbn/${isbn}.json`;
        const response = await axios.get(link);

        let records=response.data.records;
        const address=records[Object.keys(records)[0]];
        console.log(address);
        const data=(address.details.details);
        console.log(data.title);
        console.log(address.data.authors[0].name);

        


        const bookTitle = data.title;
        const authorName = address.data.authors?.[0]?.name || "Unknown Author";

        return NextResponse.json({ authorName, bookTitle });
    } catch (error) {
        console.error("Error fetching book data:", error);
        return NextResponse.json({ error: "Failed to fetch book details" }, { status: 500 });
    }
}