import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";

export default function Search({ setSerach }) {

  const handleSearchChange = (e) => {
    setSerach(e.target.value);
  };

  return (
    <Paper className="paper-table">
      <SearchIcon style={{ margin: 23 }} />

      <InputBase
        placeholder="Busca por número de teléfono..."
        onChange={handleSearchChange}
      />
    </Paper>
  );
}
