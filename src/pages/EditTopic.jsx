import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import useServer from "../hooks/useServer";
import CourseCard from "../components/CourseCard";
import LoadingAnimation from "../components/LoadingAnimation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import useAlert from "../hooks/useAlert";
import {
  put,
  generateClientTokenFromReadWriteToken,
  upload,
} from "@vercel/blob/client";
import Skeleton from "react-loading-skeleton";
import EasyMDE from "easymde";

const EditTopic = () => {
  const nav = useNavigate();

  const { courseId, topicId } = useParams();
  const [course, setCourse] = useState(null);
  const [topic, setTopic] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [topicData, setTopicData] = useState({
    title: "",
    description: "",
    note: "",
  });
  const topicFileRef = useRef(null);
  const textareaRef = useRef(null);
  const [step, setStep] = useState(1);
  const [editor, setEditor] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    useServer(`/courses/${courseId}`, "get", (res) => setCourse(res.data));
    useServer(`/courses/topics/${topicId}`, "get", (res) => {
      setTopic(res.data);
      setTopicData({
        title: res.data.title,
        description: res.data.description,
        note: res.data.note,
      });
    });
  }, []);

  useEffect(() => {
    if (!textareaRef.current || editor) return;

    const easymde = new EasyMDE({
      element: textareaRef.current,
    });
    setEditor(easymde);
  }, [textareaRef]);

  const handlePublish = () => {
    setIsChanging(true);
    useServer(
      `/admin/courses/${courseId}/publish`,
      "patch",
      (res) => {
        useAlert(res.data?.message);
        useServer(`/courses/${courseId}`, "get", (res) => {
          setCourse(res.data);
          setIsChanging(false);
        });
      },
      {}
    );
  };
  const handleUnpublish = () => {
    setIsChanging(true);

    useServer(
      `/admin/courses/${courseId}/unpublish`,
      "patch",
      (res) => {
        useAlert(res.data?.message);
        useServer(`/courses/${courseId}`, "get", (res) => {
          setCourse(res.data);
          setIsChanging(false);
        });
      },
      {}
    );
  };
  const handleTopicUpload = async (e) => {
    e.preventDefault();

    const file = topicFileRef.current?.files[0];
    setTopicData({
      ...topicData,
      note: editor?.value(),
    });

    // return;
    setSubmitted(true);
    useServer(
      `/admin/courses/topics/${topicId}`,
      "patch",
      async (res) => {
        setSubmitted(false);
        if (res.status !== 200) return useAlert(res.data.message, "danger");
        if (res.status === 200 && !file) {
          nav(-1);
          return useAlert(res.data.message);
        }
        if (file) {
          setStep(2);
          try {
            await upload("videos/video" + file.name, file, {
              access: "public",
              handleUploadUrl: `${
                import.meta.env.VITE_BACKEND_SERVER_URL
              }/admin/handleUpload`,
              multipart: true,
              onUploadProgress: ({ percentage }) => {
                setProgress(percentage || 0);
                if (percentage === 100) {
                  useAlert("Upload completed", "success");
                  nav(-1);
                }
              },
              clientPayload: JSON.stringify({
                topicId,
              }),
            });
          } catch (error) {
            console.error("Error during file upload:", error);
            if (error.response) {
              console.error("Server Response:", error.response.data);
            }
          }
        }
      },
      { ...topicData, note: editor?.value() }
    );
  };
  return course && topic ? (
    <>
      <div className="container-fluid bg-white rounded-3 mt-3">
        <div className="row py-2 px-3">
          <div className="col-12 ps-4">
            <h3 className="project--text--primary m-0">Edit Topic</h3>
          </div>
        </div>
      </div>
      <div className="row p-4">
        <div className="col-4 p-0">
          <div
            className="p-0 bg-white rounded-3 position-sticky top-0"
            style={{
              border:
                "5px solid rgba(var(--bs-secondary-bg-rgb),var(--bs-bg-opacity))!important",
            }}
          >
            <CourseCard
              course={course}
              handlePublish={handlePublish}
              handleUnpublish={handleUnpublish}
              courseView
              isChanging={isChanging}
            />
          </div>
        </div>

        <div className="col-8">
          {step === 1 ? (
            <>
              <div className="container-fluid bg-white p-0 mt-3 rounded-top-3">
                <div className="container-fluid border-bottom p-3 m-0">
                  <h6>Topic Details</h6>
                </div>
              </div>
              <div className="container-fluid bg-white p-0 rounded-bottom-3">
                <div className="container py-4">
                  <form className="row" onSubmit={handleTopicUpload}>
                    <div className="col-12 mb-3">
                      <div className="form-floating">
                        <input
                          type="text"
                          placeholder="Topic Title"
                          name="topicTitle"
                          className="form-control"
                          required
                          value={topicData.title}
                          onChange={(e) =>
                            setTopicData({
                              ...topicData,
                              title: e.target.value,
                            })
                          }
                        />
                        <label htmlFor="topicTitle">Topic Title</label>
                      </div>
                    </div>
                    <div className="col-12 mb-3">
                      <div className="form-floating">
                        <textarea
                          type="text"
                          placeholder="Course Details"
                          name="courseDetails"
                          className="form-control"
                          required
                          style={{ height: 200 }}
                          value={topicData.description}
                          onChange={(e) =>
                            setTopicData({
                              ...topicData,
                              description: e.target.value,
                            })
                          }
                        ></textarea>
                        <label htmlFor="courseDetails">Topic Description</label>
                      </div>
                    </div>
                    <div className="col-12 mb-3">
                      <textarea
                        type="text"
                        placeholder="Enter the note for this topic"
                        name="topicNote"
                        className="form-control"
                        required
                        style={{ height: 200 }}
                        value={topicData.note}
                        onChange={(e) =>
                          setTopicData({
                            ...topicData,
                            note: e.target.value,
                          })
                        }
                        ref={textareaRef}
                      ></textarea>
                    </div>
                    <div className="col-12 mb-3">
                      <label htmlFor="courseThumbnail" className="h6">
                        Topic Video
                      </label>
                      <input
                        type="file"
                        name="topicVideo"
                        className="form-control"
                        accept="video/*"
                        ref={topicFileRef}
                      />
                    </div>
                    <div className="col-12 mb-3 d-flex">
                      <button
                        className="btn project--text--bg--primary d-flex align-items-center justify-content-center"
                        disabled={submitted}
                      >
                        {submitted && (
                          <div
                            className="spinner-border text-primary me-2"
                            role="status"
                          >
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        )}
                        {submitted ? "Editing" : "Edit"}
                      </button>
                      <Link
                        to={-1}
                        className="btn btn-danger ms-3"
                        type="button"
                      >
                        Discard
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </>
          ) : step === 2 ? (
            <>
              <div className="container-fluid bg-white p-0 rounded-3">
                <div className="container py-4">
                  <div class="progress mb-3">
                    <div
                      class="progress-bar"
                      role="progressbar"
                      aria-valuenow={progress}
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{
                        width: `${progress}%`,
                      }}
                    >
                      {progress}%
                    </div>
                  </div>
                  <h6 className="text-center">Uploading Video</h6>
                  <p className="lead fw-bold text-center">
                    Please don't exit this page until the upload is complete.
                  </p>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  ) : (
    <div className="container p-4">
      <Skeleton width={"100%"} height={50} />
      <div className="container-fluid p-0 mt-3 ">
        <div className="container-fluid">
          <Skeleton width={124} height={18} />
        </div>
      </div>
      <div className="container-fluid">
        <div className="container py-4 px-5">
          <div className="row">
            <div className="col-12 mb-3">
              <Skeleton
                // className="container-fluid rounded-3 mt-3"
                width={"100%"}
                height={58}
              />
            </div>
            <div className="col-12 mb-3">
              <Skeleton
                // className="container-fluid rounded-3 mt-3"
                width={"100%"}
                height={58}
              />
            </div>
            <div className="col-6 mb-3">
              <Skeleton
                // className="container-fluid rounded-3 mt-3"
                width={"100%"}
                height={58}
              />
            </div>
            <div className="col-6 mb-3 pt-2">
              <Skeleton
                // className="container-fluid rounded-3 mt-3"
                width={"100%"}
                height={58}
              />
            </div>
            <div className="col-6 mb-3">
              <Skeleton
                // className="container-fluid rounded-3 mt-3"
                width={"100%"}
                height={58}
              />
            </div>
            <div className="col-6 mb-3">
              <Skeleton
                // className="container-fluid rounded-3 mt-3"
                width={"100%"}
                height={58}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTopic;
