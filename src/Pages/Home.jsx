import React from 'react'
import Layout from '../components/Layout'

export default function Home() {
  return (
    <Layout>
      <div className='p-6 text-slate-700 leading-8'>
        <p>Welcome to this webapp. A react.js project written by Amirhossein Hajipoor & Alireza Asadollahi. <a className='underline text-teal-600' href="https://github.com/amirhajipoor/technical-english">GitHub</a></p>
        <p>Teacher dr. Shirmohammadi</p>
        <p>Shahid Rajaee University</p>
      </div>
    </Layout>
  )
}
