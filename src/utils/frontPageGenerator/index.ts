import generateDocument from "./useMailMerge";
import {
  names,
  dlAssignments,
  fitAssignments,
  dsAssignments,
  oopAssignments,
  caAssignments,
  nmAssignments,
  dsaAssignments,
  cnAssignments,
  dbmsAssignments,
  tocAssignments,
  simulationAssignments,
  webTechAssignments,
  nccAssignments,
  compilerAssignments,
  eComAssignments,
  ccAssignments,
} from "../../constants";
import { subjects } from "../../constants/subjects";
import { useState } from "react";
import { useBaseStore } from "../../../src/store";

export default function useFrontPageGenerator() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function generateFrontPage({
    sem,
    roll,
    customName,
    customRoll,
    subject,
    assignmentNumber,
    assignmentName,
    teacherName,
    wordFiles,
  }: {
    sem: string;
    roll: number;
    customName?: string;
    customRoll?: string;
    subject: string;
    assignmentNumber: number;
    assignmentName?: string;
    teacherName?: string;
    wordFiles: {
      setWordFile: (data: {
        subject: string;
        content: ArrayBuffer;
      }) => void;
    } & {
      [key: string]: ArrayBuffer | null;
    };
  }) {
    setLoading(true);
    setError(null);
    if (!roll && !customName) {
      return;
    }
    const { error, content } = await prefetchDocument({
      sem,
      wordFiles,
      subject,
      roll: roll || 1,
      setLoad: true,
    });

    if (error !== null) {
      setError(error);
      setLoading(false);
      return;
    }
    setError(null);

    const assignmentMap = {
      DL: dlAssignments,
      FIT: fitAssignments,
      DS: dsAssignments,
      OOP: oopAssignments,
      CA: caAssignments,
      NM: nmAssignments,
      DSA: dsaAssignments,
      CN: cnAssignments,
      DBMS: dbmsAssignments,
      TOC: tocAssignments,
      Simulation: simulationAssignments,
      "Web Tech": webTechAssignments,
      NCC: nccAssignments,
      ECom: eComAssignments,
      Compiler: compilerAssignments,
      CC: ccAssignments,
    };

    if (
      Object.prototype.hasOwnProperty.call(assignmentMap, subject)
    ) {
      assignmentName = assignmentMap[subject as keyof typeof assignmentMap]?.find(
        (assignment: any) => assignment.number === assignmentNumber
      )?.name;
    }

    const indexSubjectTable: any = {
      "DS Index": "DISCRETE STRUCTURE",
      "OOP Index": "OBJECT ORIENTED PROGRAMMING",
      "μP Index": "MICROPROCESSOR",
    };

    const studentName = customName || names[sem as keyof typeof names]?.[roll]?.[0] || "Student";
    const numRoll = customRoll ? parseInt(customRoll, 10) : 0;
    const studentRoll = customRoll ? String(customRoll) : names[sem as keyof typeof names]?.[roll]?.[1] || String(roll || 1);
    const studentSection = (numRoll ? (numRoll < 25 ? "A" : "B") : names[sem as keyof typeof names]?.[roll]?.[2]) || "A";
    
    // Get the full subject name for the placeholder
    const fullSubjectName = (subjects as any)[sem]?.[subject]?.name || subject;

    // Format semester ordinal
    const semNumberStr = sem.replace("sem", "");
    let ordinal = "th";
    if (semNumberStr === "1") ordinal = "st";
    else if (semNumberStr === "2") ordinal = "nd";
    else if (semNumberStr === "3") ordinal = "rd";
    const formattedSem = `${semNumberStr}${ordinal} Semester`;

    const data = {
      name: studentName,
      roll: studentRoll,
      assignmentNumber: "",
      assignmentName: "",
      assignmentNameUpper: "",
      subject: indexSubjectTable[subject] || fullSubjectName,
      section: studentSection,
      teacherName: teacherName || "",
      teacher: teacherName || "",
      submittedTo: teacherName || "",
      // New master template placeholders
      subject_name: fullSubjectName,
      studentname: studentName,
      teachername: teacherName || "",
      roll_no: studentRoll,
      sem: formattedSem,
      openBr: "{",
      closeBr: "}",
    };

    const outputName = `${studentName} - ${
      subject.includes("Index")
        ? `${subject}`
        : `${subject} Lab`
    } - Front Page.docx`;

    generateDocument(
      { content, data, outputName },
      setError,
      setLoading
    );
  }
  return { generateFrontPage, error, loading, setError };
}

export async function prefetchDocument({
  sem,
  wordFiles,
  subject,
  roll,
  setLoad,
}: {
  sem: string;
  wordFiles: {
    setWordFile: (data: {
      subject: string;
      content: ArrayBuffer;
    }) => void;
  } & {
    [key: string]: ArrayBuffer | null;
  };
  subject: string;
  roll: number | string;
  setLoad?: boolean;
}): Promise<
  | {
      content: ArrayBuffer;
      error: null;
    }
  | {
      content: null;
      error: string;
    }
> {
  useBaseStore.setState({ wordFileLoaded: 0 });
  let templateName = subject;
  if (!subject.includes("Index")) {
    templateName = "Master Template";
  } else if (
    ![
      "NCC Index",
      "SE Index",
      "ECom Index",
      "Compiler Index",
      "Web Tech Index",
      "Simulation Index",
      "DAA Index",
      "MM Index",
      "TOC Index",
      "DBMS Index",
      "CN Index",
      "AI Index",
      "CG Index",
      "CA Index",
      "DSA Index",
      "NM Index",
      "ADB Index",
      "CC Index",
    ].includes(subject) &&
    subject.includes("Index")
  ) {
    templateName = "Index";
  }

  let content = wordFiles[templateName];
  if (content) {
    // console.log(`Using cached ${templateName}`);
    return { content, error: null };
  }

  const link = `/static/word-templates/${templateName}.docx?${Date.now()}`;

  // console.log(`Downloading ${subject}`);
  try {
    const response = await fetch(link);
    if (!response.ok) {
      return {
        content: null,
        error: `Template file for ${templateName} not found. Please add ${templateName}.docx to word-templates.`,
      };
    }
    const contentLength =
      response.headers.get("content-length") || "";
    const total = parseInt(contentLength, 10);
    let loaded = 0;
    const res = new Response(
      new ReadableStream({
        async start(controller) {
          if (!response.body) {
            throw new Error(
              "ReadableStream not yet supported in this browser."
            );
          }
          const reader = response.body.getReader();
          for (let i = 0; ; i++) {
            const { done, value } = await reader.read();
            if (done) {
              break;
            }
            loaded += value.byteLength;
            if (setLoad) {
              if (i % 50 === 0) {
                useBaseStore.setState({
                  wordFileLoaded: (loaded / total) * 100,
                });
              }
            }
            controller.enqueue(value);
          }
          controller.close();
        },
      })
    );
    content = await res.arrayBuffer();
    // console.log(`Downloaded ${templateName}`);
    wordFiles.setWordFile({ subject: templateName, content });
    return { content, error: null };
  } catch (error) {
    console.log(error);
    return {
      content: null,
      error: "File downloading failed",
    };
  }
}
