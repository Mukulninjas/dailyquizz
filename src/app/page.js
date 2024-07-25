import Link from "next/link";

async function fetchExams() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${baseUrl}/api/exams`);
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
};

export default async function Page() {

  const exams = await fetchExams();

  return (
    <main className="bg-slate-700">
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Quiz Master
            </span>
          </Link>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-user"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  href="#exams"
                  className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                  aria-current="page"
                >
                  Exams
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  About
                </Link>
              </li>
              <li>
                <a
                  href="/contact"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <section>
        <div id="default-carousel" className="relative w-full" data-carousel="slide">
          <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
            <div className="duration-700 ease-in-out" data-carousel-item>
              <img src="https://blogmedia.testbook.com/blog/wp-content/uploads/2024/07/1752x406-65b0c5c7.png" className="absolute block w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
            </div>
          </div>
        </div>
      </section>

      <section id="exams">
        <div className="flex justify-center m-2">
          <span className="text-5xl font-bold">Exams we Offer...</span>
        </div>
        <div className="flex p-5 md:p-8 flex-wrap">
        {exams.map((exam) => {
          return <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-2">
              <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
            <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{exam.name}</h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
              <Link href={`/${exam.name.toLowerCase()}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Select
              </Link>
            </div>
          </div>
        })}
        </div>
      </section>

      <section className="p-5">
        <div className="flex">
          <div className="m-2 flex-1">
            <h2 className="text-5xl font-semibold text-gray-900 dark:text-white">How We Operate</h2>
            <p className="text-gray-700 py-3 dark:text-gray-400">
            At Quiz Master, we offer flexible learning solutions for students globally. Our platform is designed for ambitious individuals seeking a convenient yet high-quality education. Students at Quiz Master have the freedom to progress through their courses at their own pace, ensuring optimal learning outcomes.
            </p>
            <div className="flex justify-center">
            <img className="w-96 rounded-[30%]" src="./images/quizz_image.png"/>
            </div>
          </div>
          <div className="hidden md:flex justify-center w-full m-2 flex-1">
            <img src="./images/quizz_image1.png"/>
          </div>
        </div>
      </section>

      <footer className="p-5 bg-slate-950">
        <div className="flex justify-center align-middle">
          <span className="text-4xl">Quiz Master</span>
        </div>
        <div className="flex justify-evenly flex-wrap">
          <a>mukulninjas@gmail.com</a>
          <address>
            A-12, Second Floor, Wittybrains Software Limited Noida
          </address>
          <a>+919582688985</a>
        </div>
      </footer>

    </main>
  );
}
