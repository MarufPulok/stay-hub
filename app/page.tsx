import { IListingsParams } from "./actions/getListings";
import GetBookeysMain from "./components/GetBookeysMain";

export const dynamic = 'force-dynamic';

interface HomeProps {
  searchParams: IListingsParams;
}

export default function Home({ searchParams }: HomeProps) {
  return <GetBookeysMain searchParams={searchParams} />;
} 
