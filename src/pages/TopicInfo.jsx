import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import useServer from "../hooks/useServer";
import CourseCard from "../components/CourseCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import useAlert from "../hooks/useAlert";

import Skeleton from "react-loading-skeleton";
import Markdown from "react-markdown";

const TopicInfo = () => {
  const { courseId, topicId } = useParams();
  const [course, setCourse] = useState(null);
  const [topic, setTopic] = useState(null);

  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    useServer(`/courses/${courseId}`, "get", (res) => setCourse(res.data));
    useServer(`/courses/topics/${topicId}`, "get", (res) => {
      setTopic(res.data);
    });
  }, []);

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

  return course && topic ? (
    <>
      <div className="container-fluid bg-white rounded-3 mt-3">
        <div className="row py-2 px-3">
          <div className="col-12 ps-4">
            <h3 className="project--text--primary m-0">Topic Information</h3>
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
              isChanging={isChanging}
              courseView
            />
          </div>
        </div>

        <div className="col-8">
          <div className="container-fluid text-end my-3">
            <Link to={`./edit`} className="btn project--text--bg--primary">
              <FontAwesomeIcon icon={faEdit} /> Edit
            </Link>
          </div>
          <div className="container-fluid bg-white p-2 mt-3 rounded-3">
            <h1>{topic.title}</h1>
            <hr />
            <video src={topic.video} controls width="100%"></video>
            <hr />
            <h2>Note: </h2>
            <Markdown>{topic.note}</Markdown>
          </div>
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

export default TopicInfo;
