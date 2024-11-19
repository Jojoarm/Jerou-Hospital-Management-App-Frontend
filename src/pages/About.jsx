import background15Img from '../assets/background16.jpg';

const About = () => {
  return (
    <div className="mt-[130px] px-5 flex flex-col items-center justify-center">
      <div className="text-center text-2xl text-gray-500 mb-5">
        <p className="font-semibold">
          ABOUT <span className="text-gray-700 font-medium">US</span>
        </p>
      </div>
      <hr />

      <div className="my-2 flex flex-col md:flex-row items-center justify-center gap-12">
        <img
          className="w-full md:max-w-[360px] rounded-xl"
          src={background15Img}
          alt="display image"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut id
            suscipit nisl, ut lacinia dui. Phasellus eu nisi rutrum, consectetur
            massa at, interdum nibh. Ut sed nulla nulla. Fusce eu enim dolor.
            Interdum et malesuada fames ac ante ipsum primis in faucibus.
          </p>
          <p>
            Curabitur vehicula vestibulum nibh ut rutrum. Integer metus odio,
            sollicitudin non elit sollicitudin, viverra vulputate nunc. Sed
            felis felis, sagittis eu accumsan eget, malesuada vel metus. Sed
            malesuada tempus egestas. Duis non egestas eros, quis malesuada sem.
            Ut faucibus venenatis hendrerit. Curabitur et dignissim arcu. Cras
            ac turpis nisl. Vestibulum egestas lectus sit amet pellentesque
            mollis.
          </p>
          <b className="text-gray-800">Our Vision</b>
          <p>
            Mauris sed erat felis. Nam dapibus vitae lectus ut hendrerit.
            Suspendisse potenti. Proin molestie mi ipsum, ut tempor ligula
            convallis quis. In sit amet efficitur ipsum, interdum interdum
            libero. Fusce facilisis urna viverra, vestibulum est eget, varius
            velit. In ac augue quis ante rhoncus hendrerit. Proin sit amet
            suscipit lorem. Aliquam aliquet mattis neque, tincidunt porta magna
            blandit sed. Integer faucibus lobortis pharetra. Curabitur faucibus
            pretium ex ut volutpat.
          </p>
        </div>
      </div>

      <div className="text-xl my-4">
        <p>
          WHY <span className="text-gray-700 font-semibold">CHOOSE US?</span>
        </p>
        <hr />
      </div>

      <div className="flex flex-col md:flex-row gap-2 mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] rounded-2xl hover:bg-orange-500 hover:text-white hover:scale-95 transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Efficiency:</b>
          <p>
            Nulla faucibus lorem cursus blandit pulvinar. Curabitur nisl magna,
            sollicitudin quis tempor at, aliquam vel mi.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] rounded-2xl hover:bg-orange-500 hover:text-white hover:scale-95  transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Convinience:</b>
          <p>
            Morbi massa massa, sollicitudin in neque at, faucibus ornare erat.
            Cras massa sem, feugiat et scelerisque in, consectetur vitae lorem.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] rounded-2xl hover:bg-orange-500 hover:text-white hover:scale-95  transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Personalization</b>
          <p>
            Integer faucibus lobortis pharetra. Curabitur faucibus pretium ex ut
            volutpat.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
