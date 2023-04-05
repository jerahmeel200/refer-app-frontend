import React from "react";
import Head from "next/head";
import myHTML from "@/pagesLogic/landingPage/html/index.html";

function index() {
  return (
    <>
      <Head>
        <title>Welcome</title>
      </Head>
      <div dangerouslySetInnerHTML={{ __html: myHTML }} />;
    </>
  );
}

export default index;
