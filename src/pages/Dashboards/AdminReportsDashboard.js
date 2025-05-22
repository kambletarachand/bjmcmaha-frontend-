// AdminReportsDashboard.jsx
import React, { useEffect, useState } from "react";
import { Paper, Typography, Button, CircularProgress, Grid } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const fetchPrograms = async () => {
  return new Promise((res) =>
    setTimeout(() => res([
      { name: "Labour Welfare", progress: 75 },
      { name: "Industry Outreach", progress: 50 },
      { name: "Legal Aid", progress: 40 },
      { name: "Training & Seminars", progress: 90 }
    ]), 1000)
  );
};

const AdminReportsDashboard = () => {
  const [programs, setPrograms] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrograms().then(data => {
      setPrograms(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <div>
      <Typography variant="h5" gutterBottom>Program Progress Overview</Typography>
      <Paper style={{ padding: 16, marginBottom: 24 }}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={programs}>
            <XAxis dataKey="name" />
            <YAxis unit="%" />
            <Tooltip />
            <Bar dataKey="progress" fill="#1976d2" />
          </BarChart>
        </ResponsiveContainer>
        <Button variant="contained" style={{ marginTop: 16 }}>Review Programs</Button>
      </Paper>
    </div>
  );
};

export default AdminReportsDashboard;
