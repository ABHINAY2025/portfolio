export default function First() {
  return (
    <>
      <div className="flex w-full border-2 border-black h-screen  items-center justify-center ">
        <div className="flex gap-6">
        <div className=" flex justify-between flex-col">
          <div className="w-60 h-56 border-2 rounded-2xl border-black animation dissappear">2</div>
          <div className="w-60 h-20 border-2 rounded-2xl border-black animationsmall">1</div>
        </div>
        <div className="border-2 border-black w-60 h-80 flex items-center mainanimation justify-center rounded-2xl">3</div>
        <div className=" flex justify-between  flex-col">
          <div className=" w-60 h-20 border-2 border-black rounded-2xl animationsmall">5</div>
          <div className="w-60 h-56 border-2 border-black rounded-2xl animation">4</div>
        </div>
        </div>

        </div>
        <div className="w-full h-screen"> 
      </div>
    </>
  );
}
