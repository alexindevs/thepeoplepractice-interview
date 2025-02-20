const Navbar = () => {
  return (
    <nav className="w-full max-w-full h-[88px] sticky top-0 bg-white border-b border-gray-100 flex items-center justify-between z-50 px-5">
      <div className="w-1/3 flex items-center justify-start gap-4">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="cursor-pointer"
        >
          <path
            d="M4 6H20"
            stroke="#64748B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 12H20"
            stroke="#64748B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 18H20"
            stroke="#64748B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div className="justify-end items-start gap-[9.28px] inline-flex">
          <div data-svg-wrapper>
            <svg
              width="28"
              height="29"
              viewBox="0 0 28 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.529798 4.87654C0 6.15559 0 7.77706 0 11.02V17.98C0 21.223 0 22.8444 0.529798 24.1235C1.2362 25.8289 2.59113 27.1838 4.29652 27.8902C5.57557 28.42 7.19704 28.42 10.44 28.42H17.4C20.643 28.42 22.2644 28.42 23.5435 27.8902C25.2489 27.1838 26.6038 25.8289 27.3102 24.1235C27.84 22.8444 27.84 21.223 27.84 17.98V11.02C27.84 7.77706 27.84 6.15559 27.3102 4.87654C26.6038 3.17114 25.2489 1.81621 23.5435 1.10982C22.2644 0.580017 20.643 0.580017 17.4 0.580017H10.44C7.19705 0.580017 5.57557 0.580017 4.29652 1.10982C2.59113 1.81621 1.2362 3.17114 0.529798 4.87654ZM16.0554 8.2023C16.0852 8.094 15.9591 8.01071 15.8713 8.08072L8.10189 14.2711C8.02774 14.3301 8.05193 14.4484 8.14332 14.4736L12.2847 15.6164C12.3465 15.6334 12.3828 15.6973 12.3657 15.759L11.0515 20.5217C11.0217 20.63 11.1478 20.7133 11.2356 20.6432L19.005 14.4529C19.0792 14.3938 19.055 14.2756 18.9636 14.2504L14.8221 13.1076C14.7604 13.0906 14.7241 13.0267 14.7412 12.9649L16.0554 8.2023Z"
                fill="#2563EB"
              />
            </svg>
          </div>
          <div className="text-slate-900 text-[23.20px] font-bold font-['Inter'] leading-[29px]">
            XYZ shop
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-7">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="cursor-pointer"
        >
          <path
            d="M10 5C10 4.46957 10.2107 3.96086 10.5858 3.58579C10.9609 3.21071 11.4696 3 12 3C12.5304 3 13.0391 3.21071 13.4142 3.58579C13.7893 3.96086 14 4.46957 14 5C15.1484 5.54303 16.1274 6.38833 16.8321 7.4453C17.5367 8.50227 17.9404 9.73107 18 11V14C18.0753 14.6217 18.2954 15.2171 18.6428 15.7381C18.9902 16.2592 19.4551 16.6914 20 17H4C4.54494 16.6914 5.00981 16.2592 5.35719 15.7381C5.70457 15.2171 5.92474 14.6217 6 14V11C6.05956 9.73107 6.4633 8.50227 7.16795 7.4453C7.8726 6.38833 8.85159 5.54303 10 5"
            stroke="#64748B"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 17V18C9 18.7956 9.31607 19.5587 9.87868 20.1213C10.4413 20.6839 11.2044 21 12 21C12.7956 21 13.5587 20.6839 14.1213 20.1213C14.6839 19.5587 15 18.7956 15 18V17"
            stroke="#64748B"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div className="flex items-center gap-2">
          <div className="w-12 h-12 justify-center items-center inline-flex">
            <img
              className="w-12 h-12 rounded-full"
              src="https://placehold.co/48x48"
            />
          </div>

          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer"
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="#94A3B8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
