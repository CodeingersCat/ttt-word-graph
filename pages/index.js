import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import axios from 'axios';
import Loader from '../components/Loader';
import Chart from '../components/Chart';
import Intro from '../components/Intro';
import Err from '../components/Error';

export default function Home() {

  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [showChart, setChart] = useState(false);
  const [dataError, setError] = useState(null);

  const url = "https://www.terriblytinytales.com/test.txt";
  const handleSubmit = async () => {
    try{
      setError(null);
      setLoading(true)
      const { data }= await axios.get(url);
      setData(data);
      setLoading(false);
      setChart(true);
    }catch(err){
      console.log(err)
      setLoading(false);
      setError("Oops, there was an error.");
    }
  }

  return (
    <div className={styles.container}>
    
      <Head>
        <title>ttt word graph</title>
        <meta name="description" content="Word graph for ttt" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        
        {isLoading && <Loader />}

        {dataError && <Err msg={dataError}/>}
        
        {!showChart && !isLoading && <Intro url={url} handleSubmit={handleSubmit}/>}
        
        {!isLoading && showChart && <Chart data={data}/>}
      </main>
    
    </div>
  )
}


