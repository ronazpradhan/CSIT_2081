import { useEffect, useState } from "react";
import Countdown from "./Countdown";
import { examRoutine } from "../constants/examRoutine";
import { examTypes } from "../constants";

export default function NextExamTimer({ sem }: { sem: string }) {
  const [nextExam, setNextExam] = useState<any>(null);

  useEffect(() => {
    const routine = examRoutine[sem]?.[examTypes.board];
    if (!routine) {
      setNextExam(null);
      return;
    }
    
    const updateNextExam = () => {
      const now = new Date().getTime();
      // Find the first exam whose date + 24h is in the future
      const upcoming = routine.find((exam: any) => {
        const examEnd = new Date(exam.date + " GMT+05:45").getTime() + 24 * 60 * 60 * 1000;
        return examEnd > now;
      });
      setNextExam(upcoming || null);
    };

    updateNextExam();
    const interval = setInterval(updateNextExam, 60000);
    return () => clearInterval(interval);
  }, [sem]);

  if (!nextExam) return null;

  let subjectName = "";
  if (Array.isArray(nextExam.subject)) {
    subjectName = nextExam.subject.map((s: any) => s.shortName).join(" / ");
  } else if (nextExam.subject) {
    subjectName = nextExam.subject.shortName;
  }

  return (
    <Countdown 
      text={`Next Exam: ${subjectName}`}
      yyyymmddDate={nextExam.date} 
      hideTomorrow 
    />
  );
}
