"use client"
import { useEffect, useState } from "react"

function ActiveHeadings() {
  const [listItem, setListItem] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setListItem(prevItem => prevItem !== 5 ? prevItem + 1 : 0)
    }, 2500)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div>
      <div className="statistics__wrapper">
        <div className="statistics__content--header">
          <div className={`statistics__heading ${listItem === 0 && "statistics__heading--active"}`}>
            Enhance your knowledge
          </div>
          <div className={`statistics__heading ${listItem === 1 && "statistics__heading--active"}`}>
            Achieve greater success
          </div>
          <div className={`statistics__heading ${listItem === 2 && "statistics__heading--active"}`}>
            Improve your health
          </div>
          <div className={`statistics__heading ${listItem === 3 && "statistics__heading--active"}`}>
            Develop better parenting skills
          </div>
          <div className={`statistics__heading ${listItem === 4 && "statistics__heading--active"}`}>
            Increase happiness
          </div>
          <div className={`statistics__heading ${listItem === 5 && "statistics__heading--active"}`}>
            Be the best version of yourself!
          </div>
        </div>
        <div className="statistics__content--details">
          <div className="statistics__data">
            <div className="statistics__data--number">93%</div>
            <div className="statistics__data--title">
              of Summarist members <b>significantly increase</b> reading
              frequency.
            </div>
          </div>
          <div className="statistics__data">
            <div className="statistics__data--number">96%</div>
            <div className="statistics__data--title">
              of Summarist members <b>establish better</b> habits.
            </div>
          </div>
          <div className="statistics__data">
            <div className="statistics__data--number">90%</div>
            <div className="statistics__data--title">
              have made <b>significant positive</b> change to their lives.
            </div>
          </div>
        </div>
      </div>
      <div className="statistics__wrapper">
        <div
          className="statistics__content--details statistics__content--details-second"
        >
          <div className="statistics__data">
            <div className="statistics__data--number">91%</div>
            <div className="statistics__data--title">
              of Summarist members <b>report feeling more productive</b>{""} after incorporating the service into their daily routine.
            </div>
          </div>
          <div className="statistics__data">
            <div className="statistics__data--number">94%</div>
            <div className="statistics__data--title">
              of Summarist members have <b>noticed an improvement</b> in
              their overall comprehension and retention of information.
            </div>
          </div>
          <div className="statistics__data">
            <div className="statistics__data--number">88%</div>
            <div className="statistics__data--title">
              of Summarist members <b>feel more informed</b> about current
              events and industry trends since using the platform.
            </div>
          </div>
        </div>
        <div
          className="statistics__content--header statistics__content--header-second"
        >
          <div className={`statistics__heading ${listItem === 0 && "statistics__heading--active"}`}>
            Expand your learning
          </div>
          <div className={`statistics__heading ${listItem === 1 && "statistics__heading--active"}`}>
            Accomplish your goals
          </div>
          <div className={`statistics__heading ${listItem === 2 && "statistics__heading--active"}`}>
            Strengthen your vitality
          </div>
          <div className={`statistics__heading ${listItem === 3 && "statistics__heading--active"}`}>
            Become a better caregiver
          </div>
          <div className={`statistics__heading ${listItem === 4 && "statistics__heading--active"}`}>
            Improve your mood
          </div>
          <div className={`statistics__heading ${listItem === 5 && "statistics__heading--active"}`}>
            Maximize your abilities
          </div>
        </div>
      </div>
    </div>
  )
}

export default ActiveHeadings