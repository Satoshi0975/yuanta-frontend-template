import Logo from '@/assets/logo.png';
import Image from '@/lib/image';
import Link from 'next/link';
import MediaLinks from './media-links';
import Menu from './menu';

const Navbar = () => {
  // const [active, setActive] = useState('');
  // console.log(active);
  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         entry.isIntersecting && setActive(entry.target.id);
  //       });
  //     },
  //     {
  //       root: null, // 默認是視窗
  //       rootMargin: '0px',
  //       threshold: 0.1, // 當目標元素 10% 可見時觸發
  //     }
  //   );

  //   ['#gift', '#StockFutures', '#dividend'].forEach((id) => {
  //     const element = document.getElementById(id);
  //     if (element) {
  //       console.log(element);
  //       observer.observe(element);
  //     }
  //   });

  //   return () => {
  //     observer.disconnect();
  //   };
  // }, []);
  return (
    <>
      <div className="fixed left-0 right-0 top-0 z-[99] w-screen bg-white px-5 py-3 shadow-md md:px-7 md:py-4">
        <nav className="container flex items-center justify-between">
          <h1 className="">
            <Link href="/" className="">
              <Image
                src={Logo}
                className="w-28 cursor-pointer md:w-44"
                alt="Logo"
                placeholder="empty"
                priority
              />
            </Link>
          </h1>
          <ul className="hidden w-full items-center justify-end pr-5 text-lg font-bold text-primary lg:flex font-cubic">
            <li className="border-gray-300 px-3 last:border-r-0 hover:animate-pixel-glitch">
              
              <Link 
                href="https://www.yuantafutures.com.tw/openaccount_01"
                target="_blank"
                rel="noreferrer noopener"
              >
                期貨開戶
              </Link>
            </li>
            <li className="border-gray-300 px-3 last:border-r-0 hover:animate-pixel-glitch">
              <Link href="#registration">競賽報名</Link>
            </li>
            <li className="border-gray-300 px-3 last:border-r-0 hover:animate-pixel-glitch">
              <Link href="">成績查詢</Link>
            </li>
            <li className="border-gray-300 px-3 last:border-r-0 hover:animate-pixel-glitch">
              <Link href="#vote">人氣投票</Link>
            </li>
          </ul>
          <ul className="space-x-3 hidden lg:flex">
            <MediaLinks />
          </ul>
          <Menu />
        </nav>
      </div>
    </>
  );
};

export default Navbar;
