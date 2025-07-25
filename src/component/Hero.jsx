import logo from '../assets/logo.webp'

export default function Hero() {
  return (
    <div className="relative w-full bg-white">
      <div className="mx-auto max-w-7xl lg:px-8">
        <div className="flex flex-col justify-center px-4 py-10 lg:px-6">
          <div className="inline-flex items-center">
          <img src={logo} alt="" width={"50px"} />
            <span className="ml-4 text-2xl font-bold">Shop Online</span>
          </div>
          <div className="mt-10 flex max-w-max items-center space-x-2 rounded-full border p-2">
            <p className="text-xs font-medium md:text-sm">
              Lorem ipsum dolor sit amet consectetur.
              <span className="ml-2 cursor-pointer font-bold">Read More &rarr;</span>
            </p>
          </div>
          <h1 className="mt-8 max-w-4xl text-3xl font-bold tracking-tight text-black md:text-4xl lg:text-6xl">
            People who really cares about your business
          </h1>
          <p className="mt-8 max-w-3xl text-lg text-gray-700">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia ipsam nulla aperiam quo
            possimus, nihil molestiae modi tenetur esse qui repudiandae cum fuga aspernatur ea?
          </p>
          <div className="mt-8">
            <button
              type="button"
              className="rounded-md bg-black px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Subscribe
            </button>
          </div>
        </div>
        <div className="rounded-lg bg-gray-200 p-4">
          <img
            className="aspect-[3/2] w-full rounded-lg bg-gray-50 object-cover lg:aspect-auto lg:h-[400px]"
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTc1fHx0ZWFtfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
            alt=""
          />
        </div>
      </div>
    </div>

    
  )
}
