import { useEffect, useState } from "react";
import "./App.css";
import { FieldGrid } from "./components/field-grid";
import { ModeToggle } from "./components/mode-toggle";
import { TextInfo } from "./components/text-info";
import { ThemeProvider } from "./components/theme-provider";
import { fetchData, type MentalState } from "./components/data";
import { MoonLoader } from "react-spinners";
import { dateFormatter } from "./components/utils";
import { TagList } from "./components/tag-list";

const storageKey = "vite-ui-theme";

function App() {
  const [data, setData] = useState<MentalState>();

  useEffect(() => {
    fetchData().then((mental) => {
      setData(mental);
    });
  }, []);

  if (!data) {
    return (
      <ThemeProvider defaultTheme="dark" storageKey={storageKey}>
        <div className="w-full h-screen p-6 flex justify-center items-center">
          <MoonLoader
            color="#ffffff"
            loading
            size={60}
            speedMultiplier={0.25}
          />
        </div>
      </ThemeProvider>
    );
  }

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey={storageKey}>
        <div className="mx-auto container p-6 flex flex-col gap-6">
          {/* Header */}
          <div className="w-full flex justify-between">
            <div>
              {/* This is just for not having to figure out margins and shit */}
            </div>
            <h1 className="text-3xl font-bold">Mental Health Meter</h1>
            <ModeToggle />
          </div>

          <div>
            <div className="text-muted-foreground">
              Last updated: {dateFormatter(data.lastUpdated)}
            </div>
            {/* Possible description here later */}
          </div>

          <div className="w-full flex space-x-4">
            <div className="w-2/3">
              <FieldGrid data={data} />
            </div>
            {/* <Separator orientation="vertical" /> */}
            <div className="w-1/3 h-min space-y-4">
              <TextInfo
                title="What's on your mind?"
                description={data?.status}
              />

              <TagList tags={data.tags} />
            </div>
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
