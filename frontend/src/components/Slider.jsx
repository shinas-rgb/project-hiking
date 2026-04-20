import * as Slider from "@radix-ui/react-slider";

export default function SliderBar({ min, max, value, onChange }) {

  return (
    <>
      < Slider.Root
        step={1}
        value={value}
        onValueChange={onChange}
        min={min}
        max={max}
        style={styles.root}
        minStepsBetweenThumbs={1} >
        <Slider.Track style={styles.track}>
          <Slider.Range style={styles.range} />
        </Slider.Track>
        <Slider.Thumb style={styles.thumb} />
        <Slider.Thumb style={styles.thumb} />
      </Slider.Root >
      <div className="flex justify-between">
        <p>min:{value[0]}</p>
        <p>max:{value[1]}</p>
      </div>
    </>
  )
};

const styles = {
  root: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    height: 20,
  },
  track: {
    position: "relative",
    flexGrow: 1,
    height: 4,
    backgroundColor: "#ddd",
    borderRadius: 9999,
  },
  range: {
    position: "absolute",
    height: "100%",
    backgroundColor: "#3b82f6",
    borderRadius: 9999,
  },
  thumb: {
    display: "block",
    width: 16,
    height: 16,
    backgroundColor: "white",
    border: "2px solid #3b82f6",
    borderRadius: "50%",
  },
};
