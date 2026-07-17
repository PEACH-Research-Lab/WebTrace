import React from 'react'
import siteData from './siteData'

import NavBar from './components/NavBar'
import Hero from './components/Hero'
import Overview from './components/Overview'
// import Results from './components/Results'
import DataPipeline from './components/DataPipeline'
import Method from './components/Method'
import SampleVideos from './components/SampleVideos'
import BibTeX from './components/BibTeX'
import Footer from './components/Footer'

export default function App() {

  return (
    <>
      <NavBar title="WebTrace" />
      <Hero data={siteData} />
      <Overview
        image={siteData.teaserImage}
        caption={siteData.teaserCaption}
        abstract={siteData.abstract}
      />
      <DataPipeline data={siteData.dataPipeline} />
      <SampleVideos samples={siteData.results} />
      <BibTeX bibtex={siteData.bibtex} />
      <Footer data={siteData.footer} />
    </>
  )
}
