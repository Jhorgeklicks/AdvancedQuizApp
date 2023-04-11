import React from 'react'
import { Helmet } from 'react-helmet-async';

const PageTitles = ({title}) => {
  return (
    <Helmet>
           <title>{title}</title>
           <meta charset="UTF-8"/>
           <meta name="description" content="React Js Based Quiz APP"/>
           <meta name="keywords" content="HTML, CSS,React, JavaScript"/>
           <meta name="author" content="John Klicks Jnr"/>
           <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
       </Helmet>
  )
}

export default PageTitles