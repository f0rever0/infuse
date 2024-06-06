export default function Banner() {
  return (
    <div className="pr-4">
      <div className="relative pb-[56.25%] h-0 overflow-hidden">
        <iframe
          frameBorder="0"
          className="absolute top-0 left-0 w-full h-full"
          src="https://www.youtube.com/embed/8G-6a_y3Cxc?autoplay=1&mute=1&controls=0&loop=1&playlist=8G-6a_y3Cxc"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <h1 className="text-lg bold-36">BY MY MONSTER</h1>
          <p className="egular-20 w-[50%] break-keep">
            온앤오프의 미니 8집 앨범 타이틀 곡 'Bye My Monster'는 클래식한
            분위기와 강렬한 밴드 사운드의 팝 댄스 곡으로, 라흐마니노프 심포니
            2번, 3악장 (Rachmaninoff’s Symphony No.2, III. Adagio)의 테마를
            인용하여 웅장한 서사를 더욱 극대화했다. 멤버마다 긴 호흡으로 연결된
            가사가 하나의 이야기를 완성시키며, 서정적이면서도 파워풀한 보컬과
            랩, 화음이 빈틈없이 어우러져 극적인 몰입도를 높여준다.
          </p>
        </div>
      </div>
    </div>
  );
}
