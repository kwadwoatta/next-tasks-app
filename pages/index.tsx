import Head from "next/head";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  DocumentData,
} from "firebase/firestore";

import Link from "next/link";
import { Fragment } from "react";

export default function HomePage({ tasks }) {
  return (
    <Fragment>
      <Head>
        <title>All Tasks</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col lg:grid lg:grid-cols-2 text-[#59626d]">
        <section className="flex flex-col bg-[#f1f5f9] py-5 px-5 h-[100vh]">
          <section className="flex items-center">
            <p className=" font-medium text-lg">Tasks</p>
            <div className="flex-grow"></div>
            <Link href="create-task">
              <div className="rounded-lg bg-white shadow-md px-6 py-2">
                <p className="text-sm cursor-pointer">+ Add Task</p>
              </div>
            </Link>
          </section>

          {/* body */}
          <section className="mx-2 my-6">
            {(tasks as DocumentData[])
              .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
              .map((data, index) => (
                <div
                  key={data.date}
                  className="bg-white rounded-md px-2 py-4 mb-2"
                >
                  <p className="font-semibold text-black">{data.task}</p>
                  <div className="flex items-center">
                    <p className="">Due date</p>
                    <div className="flex-grow"></div>
                    <div className="shadow-md bg-[#f1f5f9] px-2 py-2 rounded-sm">
                      <p className="text-sm">
                        {Intl.DateTimeFormat("en-GB", {
                          dateStyle: "full",
                        }).format(Date.parse(data.date))}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </section>
        </section>
      </main>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const firebaseConfig = {
    apiKey: "AIzaSyDbLh1a0SBrJvk4N0Pw9EUkfMgpeAFyFhE",
    authDomain: "tasks-app-db.firebaseapp.com",
    projectId: "tasks-app-db",
    storageBucket: "tasks-app-db.appspot.com",
    messagingSenderId: "971469884252",
    appId: "1:971469884252:web:c05b34f128bb8041478f99",
    measurementId: "G-2X7WGE5KKY",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);

  const tasksCol = collection(db, "tasks");
  const taskSnapshot = await getDocs(tasksCol);
  const taskList = taskSnapshot.docs.map((doc) => doc.data());

  return { props: { tasks: taskList }, revalidate: 1 };
}
