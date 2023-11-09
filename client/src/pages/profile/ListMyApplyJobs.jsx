import {
  Avatar,
  Breadcrumbs,
  Button,
  Input,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import { useGetListApplyJobForCandidateQuery } from "../../redux/features/apis/applyJobApi";
import { useDebounce } from "../../hooks";
import { authSelect } from "../../redux/features/slices/authSlice";
import { useSelector } from "react-redux";
import { statusOptions, tableHeadApplyJob } from "../../utils/constants";
import Pagination from "../../components/Pagination";
import { covertToDate } from "../../utils/fn";
import SelectCustom from "../../components/SelectCustom";

const ListMyApplyJobs = () => {
  const { user } = useSelector(authSelect);

  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(6);
  const [page, setPage] = useState(1);
  const [statusSelected, setStatusSelected] = useState("");

  const debouncedValue = useDebounce(search, 500);

  const { data: listApplyJobsData, isFetching } =
    useGetListApplyJobForCandidateQuery(
      {
        userId: user?._id,
        search: debouncedValue,
        page,
        limit,
        status: "",
      },
      { refetchOnMountOrArgChange: true }
    );

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const handlePageChange = ({ selected }) => {
    setPage(selected + 1);
  };

  const handleSelectedStatus = (e) => {
    setStatusSelected(e);
  };

  return (
    <div className="w-full flex flex-col gap-2">
      {isFetching && <Loading />}
      <Breadcrumbs fullWidth className="!bg-white">
        <Link to="/" className="text-light-blue-500 text-sm font-bold">
          Trang chủ
        </Link>
        <Link to="/manage-jobapply" className="font-bold text-sm">
          Quản lý ứng tuyển của tôi
        </Link>
      </Breadcrumbs>
      <div className="flex flex-col gap-2 bg-white p-2 rounded-md">
        <div className="grid grid-cols-6 gap-2">
          <div className="col-span-4">
            <Input
              label="Tìm kiếm vị trí tuyển dụng"
              value={search}
              onChange={handleChangeSearch}
            />
          </div>
          <div className="col-span-2">
            <SelectCustom
              label="Trạng thái"
              options={statusOptions}
              value={statusSelected}
              onChange={handleSelectedStatus}
            />
          </div>
        </div>
        <div className="">
          <table className="w-full text-sm font-bold text-left cursor-pointer border border-blue-gray-100 !rounded-md">
            <thead className="text-xs  text-[#212f3f] bg-blue-gray-100 uppercase border-b border-blue-gray-100">
              <tr>
                {tableHeadApplyJob.map(({ id, name }) => {
                  return (
                    <th
                      key={id}
                      scope="col"
                      className="px-6 py-3 text-xs text-center"
                    >
                      {name}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {listApplyJobsData?.data?.length > 0 &&
                listApplyJobsData?.data?.map((job, index) => {
                  return (
                    <tr
                      className="bg-white border-b border-blue-gray-100 hover:bg-gray-100 "
                      key={job?._id || index}
                    >
                      <td className="px-2 text-sm font-bold py-3 text-blue-gray-800 whitespace-nowrap">
                        ... {job?._id.slice(-4)}
                      </td>
                      <td className="px-3 text-sm font-bold py-3 text-blue-gray-800">
                        <div className="flex items-center">
                          <Avatar
                            src={job?.employerId?.companyLogo}
                            alt="avatar"
                          />
                          <div className="flex flex-col">
                            <Typography className="text-xs font-bold">
                              {job?.employerId?.companyName}
                            </Typography>
                            <Typography className="text-xs font-bold">
                              {job?.employerId?.companyEmail}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className="px-2 text-xs font-bold py-3 text-blue-gray-800 name-3">
                        {job?.jobId?.recruitmentCampaignName}
                      </td>
                      <td className="px-2 text-sm font-bold py-3 text-center text-blue-gray-800">
                        <Link
                          to={job?.CVpdf}
                          target="_blank"
                          className="text-blue-500 text-xs hover:underline name"
                        >
                          {job?.CVName?.slice(0, 20)}
                        </Link>
                      </td>
                      <td className="py-3 text-center text-blue-gray-800">
                        {job.status === "notviewed" ? (
                          <div className="p-2 rounded-md text-[10px] bg-blue-50 text-blue-500">
                            Chưa xem
                          </div>
                        ) : job.status === "viewed" ? (
                          <div className="p-2 rounded-md text-[10px] bg-green-50 text-green-500">
                            Đã xem
                          </div>
                        ) : job.status === "accepted" ? (
                          <div className="p-2 rounded-md text-[10px] bg-yellow-50 text-yellow-500">
                            Được chấp nhận
                          </div>
                        ) : job.status === "rejected" ? (
                          <div className="p-2 rounded-md text-[10px] bg-red-50 text-red-500">
                            Bị từ chối
                          </div>
                        ) : (
                          <div className="p-2 rounded-md text-[10px] bg-indigo-50 text-indigo-500">
                            Đang tiến triển
                          </div>
                        )}
                      </td>
                      <td className="px-2 text-xs font-bold py-3 text-center text-blue-gray-800">
                        {covertToDate(job?.createdAt)}
                      </td>
                      <td className="px-1 text-sm font-bold py-3 text-blue-gray-800">
                        <Link to={`/list-resumes/${job?._id}`}>
                          <Button
                            variant="filled"
                            className="text-xs capitalize font-bold rounded-full !p-3  bg-blue-gray-900 text-light-blue-600"
                          >
                            Chi tiết
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <Pagination
          totalPage={5}
          handlePageChange={handlePageChange}
          page={page}
          limit={limit}
          setLimit={setLimit}
        />
      </div>
    </div>
  );
};

export default ListMyApplyJobs;