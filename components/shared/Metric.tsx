const Metric = ({ icon: Icon, number }: any) => {
  return (
    <div className="flex items-center gap-1.5">
      <Icon className="text-neutral-300" />
      <p className="text-sm text-neutral-300">{number}</p>
    </div>
  );
};
export default Metric;
