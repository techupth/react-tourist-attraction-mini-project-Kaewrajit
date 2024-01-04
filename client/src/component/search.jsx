import { useState, useEffect } from "react";
import axios from "axios";
import TitleUrl from "./titleURL";
import ClipBoard from "./Clipboard";

export default function Search() {
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const searchFromServer = async (searchText = "") => {
    try {
      const response = await axios.get(
        `http://localhost:4001/trips?keywords=${searchText}`
      );
      setSearchResult(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event, tagValue) => {
    // const newSearchValue = event.target.value || tagValue;
    // setSearchText(newSearchValue);
    setSearchText(event.target.value || tagValue);
  };

  useEffect(() => {
    searchFromServer(searchText);
  }, [searchText]);

  return (
    <div className="App">
      <h1 className="text-5xl font-body text-cyan-500 mt-6 text-center">
        เที่ยวไหนดี
      </h1>
      <h3 className="font-body text-lg mt-6 ml-32 ">ค้นหาที่เที่ยว</h3>
      <div className="flex justify-center items-start ">
        <input
          className="font-body text-center w-3/4 h-10 shadow-md  "
          type="text"
          placeholder="หาที่เที่ยวแล้วไปกัน.."
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
        />
      </div>
      <div className="p-5 ml-16 mr-16 ">
        {searchResult.length > 0 && (
          <>
            {searchResult.map((result, index) => (
              <div key={index} className="autocompleteItems flex relative ">
                <div className="flex items-start  ">
                  <img
                    src={result.photos[0]}
                    className="w-96 h-56 min-w-96 min-h-56 rounded-[10px] object-cover mr-4"
                  />

                  <ClipBoard textToCopy={result.url} />
                </div>
                <div className="flex flex-col justify-start">
                  <TitleUrl title={result.title} url={result.url} />
                  <div className="font-body text-base text-gray-600 mt-2 line-clamp-1">
                    {result.description}
                  </div>
                  <a href={result.url} className="text-blue-500 underline mt-2">
                    อ่านต่อ
                  </a>
                  <div className="flex mt-2">
                    <div className="mr-2">หมวด</div>
                    <div className="blog-tags flex flex-wrap">
                      {result.tags.map((tag, index) => (
                        <span key={index}>
                          {index !== result.tags.length - 1 ? (
                            <span
                              onClick={(event) => handleInputChange(event, tag)}
                              className="p-1 underline cursor-pointer"
                            >
                              {tag}{" "}
                            </span>
                          ) : (
                            <>
                              <span className="p-1">และ</span>
                              <span
                                onClick={(event) =>
                                  handleInputChange(event, tag)
                                }
                                className="p-1 underline cursor-pointer"
                              >
                                {tag}
                              </span>
                            </>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex mt-2 mb-10">
                    {result.photos.slice(1).map((photos, index) => (
                      <img
                        key={index}
                        src={photos}
                        className="object-cover w-[100px] h-[100px] rounded-[10px] mr-[10px]"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
