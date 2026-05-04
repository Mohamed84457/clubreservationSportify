"use client";
// mui
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

// emuns
import { typeUsingSlots } from "../utils/enums";
import { FormEvent, useEffect, useState } from "react";
// helpers
import {
  timeToMinutes,
  minutesToAmPm,
  isSameDay,
  getDateFromTimestamp,
  combineDateAndTimeFromMinutes,
} from "../helpers/methods";
// interfaces
import { ApiResponse, Ireservation } from "../utils/interfaces";
// components
import { buildSlots } from "./Buildingslot";
import Slot from "./Slot";
// mui icons
import BuildIcon from "@mui/icons-material/Build";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Cookies from "universal-cookie";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
export default function Slots({
  typeusing = typeUsingSlots.user,
  selecteddate,
}: {
  selecteddate: Date | null;
  typeusing: typeUsingSlots;
}) {
  const back_end_url = process.env.NEXT_PUBLIC_BACK_END_URL;
  const make_reservation = process.env.NEXT_PUBLIC_ADMIN_MAKE_RESERVATION_PATH;
  const make_maintenance = process.env.NEXT_PUBLIC_ADMIN_MAKE_MAINTENANCE_PATH;
  const get_reservation = process.env.NEXT_PUBLIC_ADMIN_GET_RESERVATION_PATH;
  // toast
  const [openToast, setOpenToast] = useState<{
    open: boolean;
    type: "success" | "error" | "warning" | "info";
    message: string;
  }>({
    open: false,
    type: "success",
    message: "",
  });

  const handleCloseToast = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenToast((pre) => {
      return {
        ...pre,
        open: false,
      };
    });
  };

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false); // for buttons  const [maintenanceNote, setMaintenanceNote] = useState<string>("");

  // maintenance dialog
  const [maintenanceNote, setMaintenanceNote] = useState<string>("");
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    makeMantenance();
  };
  // cookie
  const Cookie = new Cookies();
  // router
  const router = useRouter();

  const [allReservations, setAllReservations] = useState<Ireservation[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string[]>([]);

  const times = selectedSlot.map(timeToMinutes);
  const minTime = times.length ? Math.min(...times) : null;
  const maxTime = times.length ? Math.max(...times) : null;

  const mintimeampm = minTime !== null ? minutesToAmPm(minTime) : "";

  const maxtimeampm = maxTime !== null ? minutesToAmPm(maxTime + 30) : "";

  const handleSelectedSlot = (slotTime: string) => {
    setSelectedSlot((prev) => {
      const newTime = timeToMinutes(slotTime);
      const times = prev.map(timeToMinutes);
      const minTime = Math.min(...times);
      const maxTime = Math.max(...times);

      // 🔴 REMOVE
      if (prev.includes(slotTime)) {
        if (newTime === minTime || newTime === maxTime) {
          return prev.filter((slot) => slot !== slotTime);
        }
        return prev;
      }

      // 🟢 ADD
      if (prev.length === 0) return [slotTime];
      if (newTime === maxTime + 30) return [...prev, slotTime];
      if (newTime === minTime - 30) return [slotTime, ...prev];

      return prev;
    });
  };

  const isSelected = (slotTime: string) => selectedSlot.includes(slotTime);

  // make maintenance
  const makeMantenance = async () => {
    if (actionLoading) return; // prevent spam clicks
    // token
    const accessToken = Cookie.get("sportifyaccesstoken");
    if (!accessToken) {
      router.push("/LogIn");
      return;
    }
    if (!selecteddate || minTime === null || maxTime === null) return;
    setActionLoading(true);
    try {
      const startMinutes = minTime;
      const endMinutes = maxTime + 30;
      const response = await axios.post(
        `${back_end_url}${make_maintenance}`,
        {
          startTime: combineDateAndTimeFromMinutes(selecteddate, startMinutes),
          endTime: combineDateAndTimeFromMinutes(selecteddate, endMinutes),
          note: maintenanceNote,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      console.log(response);
      handleClose();
      router.push("/Home/venues");
    } catch (error: unknown) {
      const err = error as AxiosError;
      if (err.response?.status === 401) {
        router.push("/LogIn");
      }
    } finally {
      setActionLoading(false);
    }
  };
  // validate reservation date and time before sending request
  function validateReservationDate(date: Date): string | null {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const reservation = new Date(date);
    reservation.setHours(0, 0, 0, 0);

    const diffDays =
      (reservation.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

    if (diffDays < 0) return "You cannot reserve in the past";
    if (diffDays > 5) return "You can not reserve more than 5 days ahead";

    return null;
  }

  // make reservation
  const makeReservation = async () => {
    if (actionLoading) return; // prevent spam clicks
    // token
    const accessToken = Cookie.get("sportifyaccesstoken");
    if (!accessToken) {
      router.push("/LogIn");
      return;
    }
    if (!selecteddate || minTime === null || maxTime === null) return;
    const error = validateReservationDate(selecteddate);
    if (error) {
      setOpenToast({
        open: true,
        type: "error",
        message: error,
      });
      return;
    }
    setActionLoading(true);
    try {
      const startMinutes = minTime;
      const endMinutes = maxTime + 30;
      const response = await axios.post(
        `${back_end_url}${make_reservation}`,
        {
          startTime: combineDateAndTimeFromMinutes(selecteddate, startMinutes),
          endTime: combineDateAndTimeFromMinutes(selecteddate, endMinutes),
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      console.log(response.data);
      const { checkoutUrl } = response.data;

      if (checkoutUrl) {
        // IMPORTANT: send user to payment
        window.open(checkoutUrl, "_blank");
        return;
      }

      console.log("No checkout URL returned", response.data);
    } catch (error: unknown) {
      const err = error as AxiosError;
      if (err.response?.status === 401) {
        router.push("/LogIn");
      } else {
        setOpenToast({
          open: true,
          type: "error",
          message: "can not make reservation now, try again later",
        });
      }
    } finally {
      setActionLoading(false);
    }
  };
  useEffect(() => {
    const getReservations = async () => {
      setLoading(true);
      // token
      const accessToken = Cookie.get("sportifyaccesstoken");
      if (!accessToken) {
        router.push("/LogIn");
      }
      try {
        const response = await axios.get(`${back_end_url}${get_reservation}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setAllReservations(response.data);
        console.log(getDateFromTimestamp(response.data[0].startTime));
        console.log(response.data);
      } catch (error: unknown) {
        const err = error as AxiosError;
        if (err.response?.status === 401) {
          router.push("/LogIn");
        } else {
          console.log(err);
        }
      } finally {
        setLoading(false);
      }
    };
    getReservations();
  }, []);

  const todayReservations = selecteddate
    ? allReservations.filter((res) => {
        const resDate = new Date(res.startTime);
        return isSameDay(resDate, selecteddate);
      })
    : [];
  // filter reservation to extract maintenance and confirmed only
  const filteredSlots = (todayReservations ?? []).filter((res) => {
    const status = res.status.toLowerCase();
    return status === "maintenance" || status === "confirmed";
  });
  // Mock API
  const apiData: ApiResponse = {
    openingHours: { start: "01:00", end: "24:00" },
    slotDuration: 30,
    reservations: filteredSlots,
  };
  const slots = buildSlots(apiData);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Loading slots...
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-1">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
          {selecteddate ? selecteddate.toDateString() : "Select a date"}
        </h2>

        <p className="text-sm text-gray-500">
          Choose your time range (30 min slots)
        </p>

        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mt-3" />
      </div>
      {/* Slots Grid */}
      {slots.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-gray-400">
          <p>No available slots</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-600">Available Slots</p>
            <p className="text-xs text-gray-400">{slots.length} slots</p>
          </div>
          <div className="transition-all duration-300 ease-in-out">
            <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(110px,1fr))] gap-3">
              {slots.map((slot) => (
                <Slot
                  key={slot.id}
                  time={slot.time}
                  isavailable={slot.available}
                  isselected={isSelected(slot.time)}
                  state={slot.state}
                  onClick={() =>
                    slot.available && handleSelectedSlot(slot.time)
                  }
                />
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Bottom Sticky Summary */}
      <div className="sticky bottom-4 z-30">
        <div
          className="bg-zinc-800/90 backdrop-blur-lg border border-zinc-700 
  rounded-2xl p-4 shadow-xl"
        >
          {/* Container */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Time Info */}
            <div>
              {selectedSlot.length === 0 ? (
                <p className="text-gray-400 text-sm">No slot selected</p>
              ) : (
                <div>
                  <p className="text-sm text-gray-400">Selected Time</p>
                  <p className="font-semibold text-lg text-green-400 flex items-center gap-1.5">
                    <span>{mintimeampm}</span>
                    <span>- {maxtimeampm}</span>
                  </p>
                  <p className="text-xs text-gray-400">
                    Total:
                    <span className="text-green-400">
                      {" "}
                      {selectedSlot.length * 50}
                    </span>{" "}
                    EGP
                  </p>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              {/* Confirm */}
              <button
                onClick={makeReservation}
                disabled={!selecteddate || selectedSlot.length === 0}
                className="flex-1 md:flex-none 
          bg-green-500 hover:bg-green-600 
          disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed
          disabled:hover:shadow-none disabled:hover:translate-y-0
          text-white font-semibold py-2.5 px-4 rounded-xl shadow-md 
          transition-all duration-200 active:scale-95 
          flex items-center justify-center gap-2 
          hover:shadow-lg hover:-translate-y-0.5"
              >
                <CheckCircleIcon fontSize="small" />
                {actionLoading ? "Processing..." : "Confirmed"}
              </button>

              {/* Maintenance */}
              {typeusing === typeUsingSlots.admin && (
                <button
                  onClick={() => {
                    setOpen(true);
                  }}
                  disabled={selectedSlot.length === 0 || actionLoading}
                  className="flex-1 md:flex-none 
          bg-red-500 hover:bg-red-600 
          disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed
          text-white font-semibold py-2.5 px-4 rounded-xl shadow-md 
          transition-all duration-200 active:scale-95 
          flex items-center justify-center gap-2 
          hover:shadow-lg hover:-translate-y-0.5"
                >
                  <BuildIcon fontSize="small" />
                  {actionLoading ? "Processing..." : "Maintenance"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Note</DialogTitle>
        <DialogContent>
          <DialogContentText>Reason of maintenance</DialogContentText>
          <form onSubmit={handleSubmit} id="subscription-form">
            <TextField
              value={maintenanceNote}
              onChange={(e) => {
                setMaintenanceNote(e.target.value);
              }}
              autoFocus
              required
              margin="dense"
              id="maintenance"
              name="maintenanceNote"
              label="maintenance Note"
              type="text"
              fullWidth
              variant="standard"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            type="submit"
            form="subscription-form"
            disabled={
              !selecteddate || selectedSlot.length === 0 || actionLoading
            }
          >
            confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* snackbar */}
      <Snackbar
        open={openToast.open}
        autoHideDuration={6000}
        onClose={handleCloseToast}
      >
        <Alert
          onClose={handleCloseToast}
          severity={openToast.type}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {openToast.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
