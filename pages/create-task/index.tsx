import Head from "next/head";
import {
  ChevronRightIcon,
  ClockIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  LinkIcon,
  MenuAlt2Icon,
  MenuIcon,
  PaperClipIcon,
  PhotographIcon,
  QrcodeIcon,
  ViewGridIcon,
} from "@heroicons/react/outline";
import { ExclamationCircleIcon, CalendarIcon } from "@heroicons/react/solid";
import React, { Fragment, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, setDoc, doc } from "firebase/firestore";

import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useRouter } from "next/router";

export default function AddTaskPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [task, setTask] = useState("");
  const [date, setDate] = useState(new Date());

  const router = useRouter();

  async function createTask() {
    if (task.length == 0) {
      return;
    }

    try {
      setIsLoading(true);
      const firebaseConfig = {
        apiKey: "AIzaSyDbLh1a0SBrJvk4N0Pw9EUkfMgpeAFyFhE",
        authDomain: "tasks-app-db.firebaseapp.com",
        projectId: "tasks-app-db",
        storageBucket: "tasks-app-db.appspot.com",
        messagingSenderId: "971469884252",
        appId: "1:971469884252:web:c05b34f128bb8041478f99",
        measurementId: "G-2X7WGE5KKY",
      };
      const app = initializeApp(firebaseConfig);

      const db = getFirestore(app);

      const tasksCol = collection(db, "tasks");
      const tasksDoc = doc(tasksCol);

      await setDoc(tasksDoc, {
        task: task,
        date: date.toISOString(),
      });
      setIsLoading(false);
      router.replace("/");
    } catch (error) {
      setIsLoading(false);
    }
  }

  return (
    <Fragment>
      <Head>
        <title>Create a task</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col lg:grid lg:grid-cols-2 text-[#59626d]">
        <section className="flex flex-col bg-[#f1f5f9] py-5 px-5 h-[100vh]">
          <section className="flex items-center">
            <p className=" font-medium text-sm">Projects / Create a task</p>
            <div className="flex-grow"></div>
            <div className="flex justify-center items-center gap-x-4">
              {/* <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
              <input
                type="checkbox"
                name="toggle"
                id="toggle"
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
              />
            </div> */}
              <p className="text-sm">Public</p>
              <LinkIcon className="h-5" />
              <QrcodeIcon className="h-5" />
            </div>
          </section>

          {/* body */}
          <section className="mx-2 my-6">
            <p className="font-bold text-xl text-black">
              Widelab: Review Design
            </p>
            <div className="flex gap-x-4 pt-6 pb-4 font-bold text-sm">
              <p className="bg-white p-1 w-24 text-center rounded-md">
                Description
              </p>
              <p className="text-[#616b74] p-1 w-24 text-center rounded-md">
                Preview
              </p>
            </div>

            <div className="grid divide-y-2 rounded-md border-2 border-[#edf1f4] bg-white">
              {/* text area */}
              <textarea
                placeholder="Enter Description"
                className="h-[25vh] sm:h-[22vh] w-full p-2 rounded-md outline-none focus:border-[#36cb82]"
                onChange={(event) => setTask(event.target.value)}
                value={task}
                readOnly={isLoading}
              />
              <div className="flex px-3 py-2 items-center text-[#798493]">
                <div className="flex gap-x-2 items-center">
                  <PaperClipIcon className="h-5" />
                  <PhotographIcon className="h-5" />
                  <EmojiHappyIcon className="h-5" />
                </div>
                <div className="flex-grow"></div>
                <p className="">Text Formatting</p>
              </div>
            </div>
          </section>

          {/* checkbox section */}
          <section className="mx-2 mt-4 border-l-2 border-[#e7ebee] px-3 space-y-5">
            <div className="flex gap-x-4 items-center">
              <p className="text-xs text-[#56626c] font-semibold">SUB-TASKS</p>
              <div className="w-10 h-2 bg-[#e1e7eb] rounded-md">
                <div className="w-5 h-2 bg-[#36cb82] rounded-md"></div>
              </div>
            </div>

            <div className="flex items-center gap-x-3">
              <MenuAlt2Icon className="h-5" />
              <input
                type="checkbox"
                className="rounded-sm appearance-none checked:bg-[#36cb82] checked:border-transparent checked:text-white h-4 w-4"
                checked
                readOnly
              />
              <p className="text-sm line-through">
                Create realtime socket for agenda
              </p>
            </div>
            <div className="flex items-center gap-x-3">
              <MenuAlt2Icon className="h-5" />
              <input
                type="checkbox"
                className="rounded-sm appearance-none bg-white checked:bg-[#36cb82] checked:border-transparent checked:text-white h-4 w-4"
              />
              <p className="text-sm">Suggest a discussion of statistics</p>
            </div>

            <input
              type="text"
              value="Responsive|"
              disabled
              className="w-full mt-2 mb-6 px-4 py-2 border bg-white border-[#36cb82] rounded-lg font-semibold text-black"
            />

            <div className="flex gap-x-4 text-sm font-semibold">
              <p className="text-[#939da5]">Discard</p>
              <p className="text-[#36cb82]">Save task</p>
            </div>
          </section>

          <div className="flex-grow"></div>

          {/* icon buttons */}
          <section className="flex gap-x-3 overflow-x-auto mt-5">
            <div className="flex gap-x-2 items-center bg-white px-3 py-2 text-center rounded-md">
              <PaperClipIcon className="h-4" />
              <p className="text-sm">Attachment</p>
            </div>
            <div className="flex gap-x-2 items-center bg-white px-3 py-2 text-center rounded-md">
              <LinkIcon className="h-4" />
              <p className="text-sm">Relationship</p>
            </div>
            <div className="flex gap-x-2 items-center bg-white px-3 py-2 text-center rounded-md">
              <ClockIcon className="h-4" />
              <p className="text-sm">Alert</p>
            </div>
            <div className="flex gap-x-2 items-center bg-white px-3 py-2 text-center rounded-md">
              <DotsHorizontalIcon className="h-4" />
              <p className="text-sm">More</p>
            </div>
          </section>
        </section>

        {/*  */}
        <section className="flex flex-col bg-white py-5 px-5 h-[100vh] text-[#57616c]">
          <div className="flex items-center gap-x-2 border shadow-md rounded-md p-3">
            <ViewGridIcon className="text-[#36cb82] h-5" />
            <p className="text-sm font-semibold">Select a project</p>
            <div className="flex-grow"></div>
            <ChevronRightIcon className="h-5" />
          </div>

          <div className="grid gap-y-4 divide-y-2 mt-5">
            <div className="flex">
              <p className="font-semibold text-sm">ATTRIBUTES</p>
              <div className="flex-grow"></div>
              <MenuIcon className="h-5" />
            </div>

            <div className="pt-5 space-y-4">
              {/* Status */}
              <div className="flex items-center gap-x-10">
                <p className="font-semibold text-sm w-16">Status</p>
                <div className="flex  items-center bg-[#feefd0] gap-x-2 px-3 py-1 rounded-md">
                  <p className="text-[#d99e2e] text-2xl">•</p>
                  <p>In progress</p>
                </div>
              </div>

              {/* Priority */}
              <div className="flex items-center gap-x-10">
                <p className="font-semibold text-sm w-16">Priority</p>
                <div className="flex  items-center bg-[#ffcfd6] gap-x-2 px-3 py-1 rounded-md">
                  <ExclamationCircleIcon className="text-[#d94052] h-5" />
                  <p>High</p>
                </div>
              </div>

              {/* Assignee */}
              <div className="flex items-center gap-x-10">
                <p className="font-semibold text-sm w-16">Assignee</p>
                <div className="flex  items-center bg-white border-[#e0e4e9] border-2 gap-x-2 px-3 py-1 rounded-md">
                  <img
                    className="rounded-full border border-gray-100 shadow-sm w-6"
                    src="https://randomuser.me/api/portraits/women/81.jpg"
                    alt="user image"
                  />
                  <p>Maciej Kalaska</p>
                </div>
              </div>

              {/* Due Date */}
              <div className="flex items-center gap-x-10 rounded-lg p-2 bg-[#edf1f4]">
                <p className="font-semibold text-sm w-16">Due date</p>
                <div
                  onClick={() => {
                    if (!isLoading) {
                      setShowModal(true);
                    }
                  }}
                  className="flex  items-center bg-white shadow-sm gap-x-2 px-3 py-1 rounded-md"
                >
                  <CalendarIcon className="text-[#36cb82] w-5" />
                  <p>{Intl.DateTimeFormat("en-US").format(date)}</p>
                </div>
              </div>

              {showModal ? (
                <>
                  <div
                    onClick={() => setShowModal(false)}
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                  >
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                      {/*content*/}
                      <div>
                        <Calendar
                          onChange={(item) => setDate(item as Date)}
                          date={date}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
              ) : null}

              <p>+ Add attribute</p>
            </div>
          </div>

          <div className="flex-grow"></div>
          <div className="flex justify-end gap-x-3">
            <div
              onClick={() => {
                if (!isLoading) {
                  router.replace("/");
                }
              }}
              className="cursor-pointer bg-white border-2 border-[#cfe6f8] shadow-md px-6 py-1.5 font-semibold text-black rounded-lg"
            >
              <p>Cancel</p>
            </div>
            <div
              onClick={() => {
                if (!isLoading) {
                  createTask();
                }
              }}
              className="cursor-pointer bg-[#36cb82] shadow-md px-6 py-1.5 font-semibold text-white rounded-lg"
            >
              <p>+ Create</p>
            </div>
          </div>
        </section>
      </main>
    </Fragment>
  );
}
